/// <reference types="@types/spotify-web-playback-sdk"/>
import { useState } from 'react'
import Task from '../../../interfaces/Task'
import AppState from '../../../interfaces/AppState'
import axios from 'axios'

interface WebPlaybackProps {
    appState: AppState
    task: Task
}

const WebPlayback: React.FC<WebPlaybackProps> = ({ appState, task }) => {
    const [URI, setURI] = useState(null)
    const playlistID = task.playlist_id

    try {
        ;(async () => {
            const res = await axios.get(
                `https://api.spotify.com/v1/playlists/${playlistID}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            setURI(res.data.uri)
        })()
    } catch (error: any) {
        console.error('Failed to get playlist URI:', error.message)
    }

    return (
        <>
            <iframe
                title='Spotify Embed: Recommendation Playlist '
                src={`https://open.spotify.com/embed/playlist/${URI}?utm_source=generator&theme=0`}
                width='100%'
                height='100%'
                style={{ minHeight: '360px' }}
                frameBorder='0'
                allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                loading='lazy'
            />
        </>
    )
}

export default WebPlayback
