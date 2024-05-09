import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import DetailsHeroImage from "@/modules/skeletons/components/DetailsHeroImage";
import WatchAndBuy from "@/modules/skeletons/components/WatchAndBuy";
import ShareBtnGroup from "@/modules/skeletons/components/ShareBtnGroup";
const PackageDetailsHeroImageMobile = () => {
    return (
        <>
        <DetailsHeroImage />
        <div className="text-white container mx-auto px-4 z-10 relative my-4">
            <div className='h-full mb-2 lg:mb-3 max-w-[260px]'>
                <Skeleton baseColor='#333' highlightColor='#666' height={40}/>
            </div>
            <div className='max-w-[220px]'>
                <Skeleton baseColor='#333' highlightColor='#666' height={18}/>
            </div>
        </div>
        <div className='relative z-20'>
            <WatchAndBuy />
            <ShareBtnGroup />
        </div>
        </>
    );
}
export default PackageDetailsHeroImageMobile;