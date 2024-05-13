import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useIsMobile from "@/hooks/useIsMobile";
import ReelHeading from "@/modules/skeletons/elements/ReelHeading";
const MultiRawRoll = () => {
  const isMobile = useIsMobile();
  return (
    <div
      className="px-4 max-w-[2400px] mx-auto"
      style={{
        marginTop: isMobile ? "70px" : "120px",
      }}
    >
      <div
        className={`min-h-[70vh] z-10 relative my-8 lg:mt-[2vw] lg:mb-[3vw] movieSlider ${
          isMobile ? "portrait" : ""
        }`}
      >
        <div className="movieSliderInner">
          <ReelHeading />
          <div className="block lg:hidden">
            <div className="flex lg:flex flex-wrap mx-[-10px]">
              {new Array(8).fill(0).map((_, index) => (
                <div
                  key={index}
                  className="p-[10px] flex flex-col justify-end relative movieCard w-1/2 sm:w-1/3  md:w-1/4"
                >
                  <Skeleton
                    baseColor="#333"
                    highlightColor="#666"
                    className="aspect-[6/9] w-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex flex-wrap mx-[-7px] lg:mx-[-15px]">
            {new Array(9).fill(0).map((_, index) => (
              <div
                key={index}
                className="w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 p-[7px] lg:p-[15px] pt-0"
              >
                <Skeleton
                  baseColor="#333"
                  highlightColor="#666"
                  className="aspect-video w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MultiRawRoll;
