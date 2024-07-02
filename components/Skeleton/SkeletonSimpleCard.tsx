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
            key={stableKeys[index]}
            className="bg-zinc-700 rounded-md shadow-md mr-[10px] min-w-[150px] w-[150px] lg:mr-0 lg:mb-4" >
              <div className="w-full">
                  <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full rounded-md' />
              </div>
            </div>
        ))}
        </>
    )
}

export default SkeletonSimpleCard