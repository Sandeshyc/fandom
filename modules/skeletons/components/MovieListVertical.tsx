import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PurchaseCard from '@/components/Skeleton/PurchaseCard';
import PurchaseCardPortrait from '@/components/Skeleton/PurchaseCardPortrait';
import useIsMobile from "@/hooks/useIsMobile";
import ReelHeading from "@/modules/skeletons/elements/ReelHeading";
const MovieListVertical = () => {
    const isMobile = useIsMobile();
    return (
      <div className={`px-4 max-w-[2400px] mx-auto`}
      style={{
        marginTop: isMobile ? "70px" : "120px",
      }}>
        <div className="min-h-[70vh] z-10 relative text-white">
          <ReelHeading />
            <div className="movieSliderInner">
              <div className="flex flex-wrap mb-4 lg:mb-8">
                <div className='w-[110px] lg:w-[150px] mr-4'>
                  <Skeleton baseColor='#333' highlightColor='#666' className='h-[34px] lg:h-[40px]' 
                  borderRadius={50}/>
                </div>
                <div className='w-[110px] lg:w-[150px]'>
                  <Skeleton baseColor='#333' highlightColor='#666' className='h-[34px] lg:h-[40px]' 
                  borderRadius={50}/>
                </div>
              </div>
              <div className="sm:flex flex-wrap w-full hidden">
                <PurchaseCard count={8}/>
              </div>
              <div className="w-full sm:hidden">
                <PurchaseCardPortrait count={8}/>
              </div>
            </div>
        </div>
      </div>
    );
}
export default MovieListVertical;