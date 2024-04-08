import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonListCard from '@/components/Skeleton/ListCard';
const MovieWatchList = () => {
    return (
        <div className='container mx-auto max-w-[2400px]'>
            <div className="pb-12">
                <div className={`px-4`}>
                    <div className="movieSliderInner">
                        <div className="w-[200px] lg:w-[350px] px-2">
                            <Skeleton baseColor='#333' highlightColor='#666' className='h-[30px] lg:h-[40px] mb-4' />
                        </div>
                        <div className="flex flex-wrap">
                            <SkeletonListCard count={12}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MovieWatchList;