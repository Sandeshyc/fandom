import React, { useState, useEffect } from "react";
import { MovieInterface } from "@/types";
import MovieCardReelBorderd from "@/modules/elements/MovieCardReelBorderd";
import MovieCardReelPortrait from "@/modules/elements/MovieCardReelPortrait";
import ReelHeading from "@/modules/elements/ReelHeading";
import { isEmpty } from "lodash";
import { stableKeys } from "@/utils/stableKeys";
import useIsMobile from '@/hooks/useIsMobile';

type Props = {
  data: MovieInterface[];
  title: string;
  link?: string;
  linkText?: string;
  isBoxesLayout?: boolean;
  module: any;
  marginTop?: boolean;
};
const RollBorderedMulti = ({
  data,
  title,
  link,
  linkText,
  isBoxesLayout,
  marginTop
}: Props) => {
  const isMobile = useIsMobile();
  if (isEmpty(data)) {
    return null;
  }
  const ReelContent = () => (
    <div className={`min-h-[70vh] z-10 relative my-8 lg:mt-[2vw] lg:mb-[3vw] movieSlider ${(isMobile) ? 'portrait': ""}`}>
      <div className="movieSliderInner">
        <ReelHeading title={title}/>
        <div className="flex flex-wrap mx-[-7px] lg:mx-[-15px]"> 
            {data?.map((movie, index) => (
              <div className="w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 p-[7px] lg:p-[15px] pt-0" key={stableKeys[index]}>
                <MovieCardReelBorderd data={movie} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
  return (
    <>
      {Array.isArray(data) && data.length > 0 ? (
        isBoxesLayout === true ? (
          <>
            <div className="w-full overflow-hidden"
            style={{
              marginTop: marginTop ? ((isMobile)?'70px': '120px') : '0px',
            }}>
              <div className="max-w-[1600px] mx-auto px-[15px]">
                <div className="overflow-hidden movieBoxsInside">
                  {ReelContent()}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="px-4 max-w-[2400px] mx-auto"
          style={{
            marginTop: marginTop ? ((isMobile)?'70px': '120px') : '0px',
          }}
          >{ReelContent()}</div>
        )
      ) : null}
    </>
  );
};

export default RollBorderedMulti;
