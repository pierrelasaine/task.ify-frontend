/// <reference types="@types/spotify-web-playback-sdk"/>
// import { useState } from 'react'
// import Task from '../../../interfaces/Task'
// import AppState from '../../../interfaces/AppState'
// import axios from 'axios'
import WebPlaybackProps from '../../../interfaces/WebPlaybackProps'
import './WebPlayback.css'

const WebPlayback: React.FC<WebPlaybackProps> = ({
    task,
    togglePlayPause,
    isPlaying
}) => {
    const playlistID = task.playlist_id

    const iframe = document.querySelector('.spotify-embed') as HTMLIFrameElement
    const iframeContent = iframe.contentWindow!
    const playPauseButton = iframeContent.document.querySelector(
        '.play-pause-button'
    )! as HTMLButtonElement

    function playPause() {
        togglePlayPause()
        playPauseButton.click()
    }

    return (
        <section className='player'>
            <button
                className='play-pause-button-custom'
                onClick={() => playPause()}>
                <h1>{isPlaying ? '||' : '>'}</h1>
            </button>
            <iframe
                title='Spotify Embed: Recommendation Playlist '
                src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator&theme=0`}
                className='spotify-embed'
                width='100%'
                height='100%'
                style={{ minHeight: '360px' }}
                frameBorder='0'
                allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                loading='lazy'
            />
        </section>
    )
}

export default WebPlayback
