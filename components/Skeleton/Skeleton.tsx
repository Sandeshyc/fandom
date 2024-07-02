import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type SkeletonProps = {
    baseColor?: string,
    highlightColor?: string,
    className?: string,
    Height?: number
}
const Skeleton = ({
    baseColor = '#aaa',
    highlightColor = '#eee',
    className = '',
    Height,
}:SkeletonProps) => {
    return (<Skeleton baseColor='#333' highlightColor='#666' className='aspect-[16/9] w-full rounded-md' />)
}

export default Skeleton