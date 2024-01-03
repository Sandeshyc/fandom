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
            <div className='w-full lg:w-1/2 2xl:w-1/3 px-2 mb-4'>
                <div className="group bg-gray-800 relative mb-4 flex flex-wrap text-white w-full rounded-sm sm:mr-4 justify-between" key={stableKeys[index]}>
                    <div className="w-[40%] relative">
                        <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[16/9] w-full rounded-md' />
                    </div>
                    <div className="w-[58%] pt-1 pr-4">
                        <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[20/1] w-[80%] mb-1' count={3}/>
                    </div>
                </div>
            </div>
        ))}
        </>
    )
}

export default SkeletonListCard