import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { stableKeys } from '@/utils/stableKeys';
import { Check, ShoppingBagOutlined } from "@mui/icons-material";
import { ClockIcon } from '@heroicons/react/24/outline';
type SkeletonPurchaseProps = {
    count: number
}
const PurchaseCard = ({
    count = 1
}:SkeletonPurchaseProps) => {    
    return (
        <>
        {(Array.from(Array(count).keys()))?.map((item, index) => (
            <div className='w-full sm:w-1/2 xl:w-1/3 2xl:w-1/4 px-2 mb-4'
            key={stableKeys[index]}>
                <div className="group bg-gray-800 relative mb-4 flex flex-wrap text-white max-w-[780px] w-full rounded-md sm:mr-4 justify-between" key={stableKeys[index]}>
                    <div className="w-[40%] relative bg-[#333] rounded-md"></div>
                    <div className="w-[58%] pt-1 pr-4 pb-1">
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

export default PurchaseCard