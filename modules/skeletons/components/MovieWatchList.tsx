import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonListCard from '@/components/Skeleton/ListCard';
const MovieWatchList = () => {
    return (
        <div className='container mx-auto max-w-[2400px] px-4 min-h-[80vh]'>
            <div className="w-[160px] lg:w-[200px]">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[30px] lg:h-[40px] mb-4' />
            </div>
            <div className="flex flex-wrap sm:mx-[-7px]">
                <SkeletonListCard count={6}/>
            </div>
        </div>
    )
}
export default MovieWatchList;