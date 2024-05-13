import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import EventRollCard from "@/modules/skeletons/elements/EventRollCard";
import useIsMobile from "@/hooks/useIsMobile";
import ReelHeading from "@/modules/skeletons/elements/ReelHeading";
const MultiRawRollUpcoming = () => {
  const isMobile = useIsMobile();
    return (
        <div className='px-4 max-w-[2400px] mx-auto min-h-[70vh]' 
        style={{
          marginTop: isMobile ? "70px" : "120px",
        }}>
          <div className={`z-10 relative my-8 lg:mt-[2vw] lg:mb-[3vw] ${(isMobile) ? 'portrait': ""}`}>
            <div className="movieSliderInner">
              <ReelHeading />
                <div className='flex flex-wrap mx-[-7px] lg:mx-[-15px] mt-4'>
                    {(new Array(5)).fill(0).map((_, index) => (
                      <div key={index} className='w-full md:w-1/2 xl:w-1/3 3xl:w-1/4 p-[7px] lg:p-[15px] pt-0 mb-6'>
                        <EventRollCard/> 
                      </div>
                    ))  
                    }                  
                </div>
            </div>
          </div>
        </div>
    );
}
export default MultiRawRollUpcoming;