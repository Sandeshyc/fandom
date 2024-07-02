import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { stableKeys } from '@/utils/stableKeys';
import { Check, ShoppingBagOutlined } from "@mui/icons-material";
import { ClockIcon } from '@heroicons/react/24/outline';
type SkeletonPurchaseProps = {
    count: number
}
const PurchaseCardPortrait = ({
    count = 1
}:SkeletonPurchaseProps) => {    
    return (
        <>
        {(Array.from(Array(count).keys()))?.map((item, index) => (
            <div className='w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 sm:px-[7px] mb-[14px]' key={stableKeys[index]}>
                <div className="group bg-gray-800 relative flex flex-wrap text-white rounded-md justify-between w-full">
                    <div className="w-[110px] sm:w-[130px] 2xl:w-[160px] bg-[#333] rounded-md aspect-[6/9] relative">
                        <Skeleton baseColor='#333' highlightColor='#666' className='h-full w-full rounded-md' />
                    </div>
                    <div className="w-[150px] px-2 py-1 grow">
                        <div className='w-[80%] mb-2'>
                            <Skeleton baseColor='#333' highlightColor='#666' className='h-[24px]'/>
                        </div>
                        <div className="text-[12px] sm:text-sm md:text-base mb-0 md:mb-1 flex items-center">
                            <Check
                                className="mr-1"
                                sx={{
                                color: "white",
                                fontSize: "20px",
                                }}
                            />
                            <div className='w-[100px]'>
                                <Skeleton baseColor='#333' highlightColor='#666' className='h-[16px]'/>
                            </div>
                        </div>
                        <div className="text-[12px] sm:text-sm md:text-base mb-0 md:mb-1 flex items-center">
                            <ShoppingBagOutlined
                                className="mr-1"
                                sx={{
                                color: "white",
                                fontSize: "20px",
                                }}
                            />
                            <div className='w-[80px]'>
                                <Skeleton baseColor='#333' highlightColor='#666' className='h-[16px]'/>
                            </div>
                        </div>
                        <div className="ftext-[12px] sm:text-sm md:text-base mb-0 md:mb-1 flex items-center">
                            <ClockIcon className="text-white w-[16px] h-[16px] mr-1"/>
                            <div className='w-[120px]'>
                                <Skeleton baseColor='#333' highlightColor='#666' className='h-[16px]'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </>
    )
}

export default PurchaseCardPortrait