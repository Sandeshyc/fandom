import RollBorderedCard from "@/modules/skeletons/elements/RollBorderedCard";
import useIsMobile from '@/hooks/useIsMobile';
import ReelHeading from "@/modules/skeletons/elements/ReelHeading";
const RollBorderedMulti = () => {
    const isMobile = useIsMobile();
    return (
      <div className="px-4 max-w-[2400px] mx-auto"
      style={{
        marginTop: (isMobile)?'70px': '120px',
      }}
      >
        <div className={`min-h-[70vh] z-10 relative my-8 lg:mt-[2vw] lg:mb-[3vw] movieSlider ${(isMobile) ? 'portrait': ""}`}>
          <ReelHeading />
            <div className="flex flex-wrap mx-[-7px] lg:mx-[-15px]">
              {
                Array(9).fill(0).map((_, index) => (
                  <div key={index} className="w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 p-[7px] lg:p-[15px] pt-0">
                    <RollBorderedCard />
                  </div>
                ))
              }
            </div> 
        </div>
      </div>
    );
}
export default RollBorderedMulti;