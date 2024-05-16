import React, {useRef, useEffect, useState} from "react";
import EventCardReelMutliRaw from "@/modules/elements/EventCardReelMutliRaw";
import MovieCardReelPortraitMultiRaw from "@/modules/elements/MovieCardReelPortraitMultiRaw";
import { Info } from "@mui/icons-material";
import { stableKeys } from "@/utils/stableKeys";
import ErrorPopUp from "@/modules/elements/ErrorPopUp";
import SkeletonSearch from "@/components/Skeleton/SkeletonSearch";
type Props = {
    movies: any;
    isLoading: boolean;
    isError:any;
    isMobile: boolean;
};
const SearchResults = ({ movies, isLoading, isError, isMobile }: Props) => {
    const [isReady, setIsReady] = useState(false);
    const sliderRef = useRef(null);
    const [removedItem, setRemovedItem] = useState(null);
    useEffect(() => {
        setIsReady(true);
    }, []);
    return (
        <>
        {isReady && !isLoading ? (
            <>
              {(Array.isArray(movies?.items) && movies?.items?.length > 0) ? (
                <>
              <div className="flex lg:hidden flex-wrap mx-[-10px]">
                {movies?.items?.map((movie: any, index: number) => (
                  <MovieCardReelPortraitMultiRaw
                    key={stableKeys[index]}
                    data={movie}
                    portrait={isMobile || true}
                    gradient={false}
                    setRemovedItem={setRemovedItem}
                  />
                ))}
              </div>
              <div className="hidden lg:flex flex-wrap mx-[-7px] lg:mx-[-15px]">
                {movies?.items?.map((movie: any, index: number) => (
                  <EventCardReelMutliRaw
                    key={stableKeys[index]}
                    data={movie}
                    portrait={false}
                    gradient={false}
                    sliderRef={sliderRef}
                    setRemovedItem={setRemovedItem}
                  />
                ))}
              </div>
              </>
              ) : (
                <NoMovies />
              )}
            </>
          ) : (
            <SkeletonSearch />
          )}
          {isError && (
            <ErrorPopUp
              message={"Sorry, Something went wrong!"}
              errorMsg={isError}
            />
          )}
        </>
    );
};
export default SearchResults;

const NoMovies = () => {
    return (
      <div className="flex flex-col items-center justify-center w-[450px] max-w-full bg-gray-600 p-8 rounded-md">
          <Info 
            sx={{ color: '#eab308', fontSize: 60 }}
            />
          <p className="text-white text-lg lg:text-2xl">No movies found!</p>
        </div>
    );
  };