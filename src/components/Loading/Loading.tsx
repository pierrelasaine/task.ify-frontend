import Skeleton from '@mui/material/Skeleton'

const Loading: React.FC = () => {
    return (
        <Skeleton
            variant='rounded'
            animation='wave'
            width={100}
            height={100}
        />
    )
}

export default Loading
