/// <reference types="@types/spotify-web-playback-sdk"/>
import { useState, useEffect } from 'react'
import Task from '../../../interfaces/Task'
import axios from 'axios'

interface WebPlaybackProps {
    task: Task
}

interface Device {
    id: String
    is_active: boolean
    is_private_session: boolean
    is_restricted: boolean
    name: String
    type: String
    volume_percent: any
}

const WebPlayback: React.FC<WebPlaybackProps> = ({ task }) => {
    const [is_paused, setPaused] = useState(false)
    const [is_active, setActive] = useState(true)
    const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined)
    const [deviceID, setDeviceID] = useState('null')
    const [trackNumber, setTrackNumber] = useState(0)
    const [milisec, setMilisec] = useState(0)
    const [URI, setURI] = useState(null)
    const playlistID = task.playlist_id

    /**
     * sets the device id using setDeviceID and Spotify "Get Available Devices" endpoint
     */
    function setsDeviceID() {
        try {
            ;(async () => {
                const res = await axios.get(
                    `https://api.spotify.com/v1/me/player/devices`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`
                        }
                    }
                )
                {
                    res.data.devices?.map((device: Device) =>
                        device.name === 'Taskify Player'
                            ? setDeviceID(`${device.id}`)
                            : setDeviceID('')
                    )
                }
            })()
        } catch (err) {
            console.log('error messege is: ', err)
        }
    }

    /**
     * sets the playlist URI using setURI and Spotify "Get Playlist" endpoint
     *
     * useful for starting play
     */
    function getsURI() {
        try {
            ;(async () => {
                const res = await axios.get(
                    `https://api.spotify.com/v1/playlists/${playlistID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`
                        }
                    }
                )

                setURI(res.data.uri)
            })()
        } catch (err) {
            console.log('error messege is: ', err)
        }
    }

    /**
     * sets the players last played position using setMilisec and Spotify "Get Currently Playing Track" endpoint
     * AND sets the players last played track using the setTrackNumber and Spotify "Get Currently Playing Track" endpoint
     *
     * useful for resuming play
     */
    function getsPositions() {
        try {
            ;(async () => {
                const res = await axios.get(
                    `https://api.spotify.com/v1/me/player/currently-playing`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`
                        }
                    }
                )

                setMilisec(res.data.timestamp)
                setTrackNumber(res.data.item.track_number)
            })()
        } catch (err) {
            console.log('error messege is: ', err)
        }
    }

    /**
     * starts at the player last played position(default zero) using Spotify "Start/Resume Playback" and "Pause Playback" endpoint
     */
    function togglePlayer() {
        if (is_paused) {
            setPaused(false)
            playPlayer()
        } else {
            setPaused(true)
            getsPositions()
            try {
                ;async () => {
                    await axios.put(
                        `https://api.spotify.com/v1/me/player/pause${deviceID}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                    'token'
                                )}`
                            }
                        }
                    )
                }
            } catch (err) {
                console.log('error message is', err)
            }
        }
    }

    function playPlayer() {
        try {
            ;async () => {
                await axios.put(
                    `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`,
                    {
                        context_uri: 'spotify:album:' + URI,
                        offset: {
                            position: trackNumber
                        },
                        position_ms: milisec
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`
                        }
                    }
                )
            }
        } catch (err) {
            console.log('error message is', err)
        }
    }

    useEffect(() => {
        getsURI()
        const script = document.createElement('script')
        script.src = 'https://sdk.scdn.co/spotify-player.js'
        script.async = true

        document.body.appendChild(script)
        console.log('this is the script: ' + script)

        const token = localStorage.getItem('token')!
        console.log(token)

        if (token != null) {
            console.log('entered window')
            window.onSpotifyWebPlaybackSDKReady = () => {
                console.log('sdk has been triggeredddddd')
                const player = new window.Spotify.Player({
                    name: 'Taskify Player',
                    getOAuthToken: cb => {
                        cb(token)
                    },
                    volume: 0.5
                })
                setPlayer(player)

                setsDeviceID()

                playPlayer()

                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id)
                })

                // Not Ready
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id)
                })

                player.addListener('initialization_error', ({ message }) => {
                    console.error(message)
                })

                player.addListener('authentication_error', ({ message }) => {
                    console.error(message)
                })

                player.addListener('account_error', ({ message }) => {
                    console.error(message)
                })

                player.addListener('player_state_changed', state => {
                    if (state) {
                        setPaused(!state.paused)
                    }
                })

                player.connect().then(success => {
                    if (success) {
                        console.log(
                            'The Web Playback SDK successfully connected to Spotify!'
                        )
                        setActive(true) // Set is_active to true when the SDK is ready
                    }
                })
                player.addListener('player_state_changed', state => {
                    if (state) {
                        setPaused(!state.paused)
                    }
                })

                player.connect().then(success => {
                    if (success) {
                        console.log(
                            'The Web Playback SDK successfully connected to Spotify!'
                        )
                    }
                })
            }
        }
    }, [localStorage.getItem('token')])

    if (!is_active) {
        return (
            <>
                <div className='container'>
                    <div className='main-wrapper'>
                        <b>
                            {' '}
                            Instance not active. Transfer your playback using
                            your Spotify app{' '}
                        </b>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='container'>
                    <div className='main-wrapper'>
                        <div className='now-playing__side'>
                            <button
                                id='togglePlay'
                                className='btn-spotify'
                                onClick={() => {
                                    togglePlayer()
                                }}>
                                {is_paused ? 'PLAY' : 'PAUSE'}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default WebPlayback
