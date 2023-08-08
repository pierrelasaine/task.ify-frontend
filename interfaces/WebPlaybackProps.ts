import Task from './Task'

export default interface WebPlaybackProps {
    task: Task
    togglePlayPause: () => void
    isPlaying: boolean
}