import React, { useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const MovieListHeroBannerItemsMobile = () => {
  return (
    <div className={`group movieSlider`}>
      <div className="relative z-10">
        <div className="block lg:hidden">
          <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide pl-1 py-2'>
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="movieCardNumber mb-2">
                  <div className="w-full aspect-video cursor-pointer">
                    <div className="bg-[#333] w-full h-full rounded-md col-span-9 relative z-20">
                      <Skeleton width="100%" height="100%" 
                        baseColor="#333"
                        highlightColor="#666"
                      />
                    </div>
                  </div>
                </div>
              ))
            }                  
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieListHeroBannerItemsMobile;
