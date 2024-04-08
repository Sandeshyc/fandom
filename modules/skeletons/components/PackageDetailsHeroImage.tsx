import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import DetailsHeroImage from "@/modules/skeletons/components/DetailsHeroImage";
const PackageDetailsHeroImage = () => {
    return (
        <>
        <DetailsHeroImage />
        <div className="text-white max-w-[1600px] mx-auto px-[15px] z-10 relative my-4">
            <div className='h-full mb-2 lg:mb-3 max-w-[260px]'>
                <Skeleton baseColor='#333' highlightColor='#666' height={40}/>
            </div>
            <div className='max-w-[220px]'>
                <Skeleton baseColor='#333' highlightColor='#666' height={18}/>
            </div>
            <div className='w-full mt-4 lg:mt-8 flex flex-wrap items-center'>
                <div className='flex flex-wrap'>
                    <div className='w-[120px] mr-2 lg:w-[140px] lg:mr-4'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                    </div>
                    <div className='w-[120px] mr-2 lg:w-[140px] lg:mr-4'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                    </div>
                    <div className='w-[40px] mr-2 lg:mr-4'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                    </div>
                    <div className='w-[40px]'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                    </div>
                </div>              
            </div>
        </div>  
        </>
    );
}
export default PackageDetailsHeroImage;
