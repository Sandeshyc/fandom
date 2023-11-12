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
            className="bg-zinc-700 rounded-md shadow-md min-w-[230px] sm:min-w-[290px] mr-[10px] lg:w-[49%] xl:w-[32%] lg:mr-0 lg:mb-4" 
            key={stableKeys[index]}>
              <div className="w-full">
                  <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[16/9] w-full rounded-md' />
              </div>
              <div className="w-full p-2">
                <div className='flex flex-wrap mt-2'>
                  <div className='w-[120px] mr-2'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={20}/>
                  </div>
                  <div className='w-[100px] flex flex-wrap'>
                    <div className='w-[30px] mr-2'>
                      <Skeleton baseColor='#333' highlightColor='#666' height={20}/>
                    </div>
                    <div className='w-[30px] mr-2'>
                      <Skeleton baseColor='#333' highlightColor='#666' height={20}/>
                    </div>
                  </div>
                  <div className='w-full mt-4'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={16} count={5}/>
                  </div>
                </div>
              </div>
            </div>
        ))}
        </>
    )
}

export default SkeletonSimpleCard