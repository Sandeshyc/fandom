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
            <div className='w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 sm:px-[7px] xl:px-[14px] mb-[14px] xl:mb-[28px]'
            key={stableKeys[index]}>
                <div className="group bg-gray-800 relative flex flex-wrap text-white rounded-md justify-between w-full">
                    <div className="w-[110px] sm:w-[130px] 2xl:w-[160px] bg-gray-600 rounded-md aspect-[6/9] relative">
                    </div>
                    <div className="w-[150px] pr-2 pl-4 py-1 grow">
                        <div className='w-[75%]'>
                            <Skeleton baseColor='#333' highlightColor='#666' className='h-[30px] mb-2'/>
                        </div>
                        <div className='mb-4 w-[50%]'>
                            <Skeleton baseColor='#333' highlightColor='#666' className='h-[16px]'/>
                        </div>
                        <div className="w-[100px]">
                            <Skeleton baseColor='#333' highlightColor='#666' className='h-[34px]' borderRadius={50}/>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </>
    )
}

export default SkeletonListCard