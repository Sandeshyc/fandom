import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { stableKeys } from '@/utils/stableKeys';

type SkeletonListProps = {
    count: number
}
const SkeletonListCard = ({
    count = 1
}:SkeletonListProps) => {    
    return (
        <>
        {(Array.from(Array(count).keys()))?.map((item, index) => (
            <div className="group bg-gray-800 relative mb-4 flex flex-wrap text-white max-w-[780px] w-full rounded-sm sm:mr-4 justify-between" key={stableKeys[index]}>
            <div className="w-[40%] relative">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-[16/9] w-full rounded-md' />
            </div>
            <div className="w-[58%] pt-1 pr-4">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-[20/1] w-[80%] mb-1' count={3}/>
            </div>
            </div>
        ))}
        </>
    )
}

export default SkeletonListCard