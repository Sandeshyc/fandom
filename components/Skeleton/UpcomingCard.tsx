import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { stableKeys } from '@/utils/stableKeys';

type SkeletonUpcomingProps = {
    count: number
}
const SkeletonUpcomingCard = ({
    count = 1
}:SkeletonUpcomingProps) => {    
    return (
        <>
        {(Array.from(Array(count).keys()))?.map((index) => (
            <div className="mr-4 mb-3 min-w-[210px] w-[210px] sm:w-[230px]" key={stableKeys[index]}>
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-[9/16] w-full rounded-md' />
            </div>
        ))}
        </>
    )
}

export default SkeletonUpcomingCard