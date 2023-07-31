/// <reference types="@types/spotify-web-playback-sdk"/>

import { useState, useEffect } from 'react'
import ApiClient from '../../../services/apiClient'

//to-be dead code

// function generateRandomString(length: number): string {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }

// async function generateCodeChallenge(codeVerifier: string): Promise<string> {
//   function base64encode(string: string): string {
//     return btoa(string)
//       .replace(/\+/g, '-')
//       .replace(/\//g, '_')
//       .replace(/=+$/, '');
//   }

//   const encoder = new TextEncoder();
//   const data = encoder.encode(codeVerifier);
//   const digest = await window.crypto.subtle.digest('SHA-256', data);

// //   return base64encode(String.fromCharCode.apply(null, new Uint8Array(digest)));
// const codeArray = Array.from(new Uint8Array(digest));
// return base64encode(String.fromCharCode.apply(null, codeArray));
// }

// const clientId = 'd7527322ca104fe891303bb7837023e5';
// const redirectUri = 'http://localhost:3001/oauth/callback';

// const codeVerifier = generateRandomString(128);

// generateCodeChallenge(codeVerifier).then((codeChallenge: string) => {
//   const state = generateRandomString(16);
//   const scope = 'user-read-private user-read-email';

//   localStorage.setItem('code_verifier', codeVerifier);

//   const args = new URLSearchParams({
//     response_type: 'code',
//     client_id: clientId,
//     scope: scope,
//     redirect_uri: redirectUri,
//     state: state,
//     code_challenge_method: 'S256',
//     code_challenge: codeChallenge,
//   });

//   window.location.href = 'https://accounts.spotify.com/authorize?' + args.toString();
// });

// const urlParams = new URLSearchParams(window.location.search);
// const code = urlParams.get('code');

// const savedCodeVerifier = localStorage.getItem('code_verifier');

// const body = new URLSearchParams({
//   grant_type: 'authorization_code',
//   code: code || '',
//   redirect_uri: redirectUri,
//   client_id: clientId,
//   code_verifier: savedCodeVerifier || '',
// });

// (async () => {
//   try {
//     const response = await fetch('https://accounts.spotify.com/api/token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: body.toString(),
//     });

//     if (!response.ok) {
//       throw new Error('HTTP status ' + response.status);
//     }

//     const data = await response.json();
//     localStorage.setItem('access_token', data.access_token);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// })();


//end of to-be dead code

interface Track {
    name: string;
    album: {
        images: { url: string }[];
    };
    artists: { name: string }[];
}

const initialTrack: Track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function WebPlayback() {

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
    const [current_track, setTrack] = useState<Track>(initialTrack);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        const response = "" + ApiClient.fetchAccessToken()
        console.log(response)

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(response); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ( state => {

                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });

            }));

            player.connect();
            player.resume().then(() => {
                console.log('Resumed!');
              });
              

        };
    }, []);

    if (!is_active) { 
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <b> Instance not active. Transfer your playback using your Spotify app </b>
                    </div>
                </div>
            </>)
    } else {
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">

                        <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />

                        <div className="now-playing__side">
                            <div className="now-playing__name">{current_track.name}</div>
                            <div className="now-playing__artist">{current_track.artists[0].name}</div>

                            <button className="btn-spotify" onClick={() => { player?.previousTrack() }} >
                                &lt;&lt;
                            </button>

                            <button className="btn-spotify" onClick={() => { player?.previousTrack() }} >
                                { is_paused ? "PLAY" : "PAUSE" }
                            </button>

                            <button className="btn-spotify" onClick={() => { player?.previousTrack() }} >
                                &gt;&gt;
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default WebPlayback;