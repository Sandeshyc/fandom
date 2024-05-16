import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import WatchAndBuy from "@/modules/skeletons/components/WatchAndBuy";
import ShareBtnGroup from "@/modules/skeletons/components/ShareBtnGroup";
const ShowSummaryMobile = () => {
    return (
        <>
        <div className='text-white z-10 relative mt-[-100px] md:mt-[-250px] bg-gradient-to-t from-black/90 from-50% to-transparent to-100%'>
            <div className='container mx-auto px-4'>
                <div className="flex flex-wrap items-end w-full">
                    <div className='w-[100px] sm:w-[120px] mr-3 aspect-[6/9] rounded-md overflow-hidden'>
                        <Skeleton baseColor='#333' highlightColor='#666' height='100%'/>
                    </div>
                    <div className='grow w-[100px]'>
                        <div className=' h-full mb-2 lg:mb-3'>
                            <div className='h-full mb-2 lg:mb-3 max-w-[260px]'>
                                <Skeleton baseColor='#333' highlightColor='#666' height={40}/>
                            </div>
                        </div>
                        <p className='flex items-center flex-wrap my-2 text-white/70 text-xs'>
                            <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50} className='mr-2'/>
                            <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50} className='mr-2'/>
                            <Skeleton baseColor='#333' highlightColor='#666' height={16} width={70}/>
                        </p> 
                    </div>
                </div>
            </div>
        </div>
        <div className='relative z-20 mt-4'>
            <WatchAndBuy />
            <ShareBtnGroup />
        </div>
        </>
    );
};
export default ShowSummaryMobile;