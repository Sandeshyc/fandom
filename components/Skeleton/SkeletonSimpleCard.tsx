import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { stableKeys } from '@/utils/stableKeys';

type SkeletonSimpleCardProps = {
    count: number
}
const SkeletonSimpleCard = ({
    count = 1
}:SkeletonSimpleCardProps) => {    
    return (
        <>
        {(Array.from(Array(count).keys()))?.map((item, index) => (
            <div 
            className="bg-zinc-700 rounded-md shadow-md mr-[10px] lg:w-[49%] xl:w-[16%] lg:mr-0 lg:mb-4" 
            key={stableKeys[index]}>
              <div className="w-full">
                  <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full rounded-md' />
              </div>
            </div>
        ))}
        </>
    )
}

export default SkeletonSimpleCard