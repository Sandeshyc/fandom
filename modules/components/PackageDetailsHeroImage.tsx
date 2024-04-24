import React, { useEffect } from "react";
import FavoriteButton from "@/components/FavoriteButton";
import PackageRentButton from "@/modules/Identities/PackageRentButton";
import { ShareIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import WarningMessage from "@/modules/Identities/WarningMessage";
import { DetailsHeroBanner } from "@/modules/components/DetailsHeroImage";
import PackageDetailsHeroImageMobile from "@/modules/components/PackageDetailsHeroImageMobile";
import useIsMobile from "@/hooks/useIsMobile";
import SocialShare from "@/modules/elements/SocialShare";
import ErrorPopUp from "@/modules/elements/ErrorPopUp";
import { getThumbnailLandscape } from "@/utils/getData";
import RentPlayNotice from "@/modules/elements/Purchase/RentPlayNotice";
import PackageRentPlayButtonAction from "@/modules/elements/Purchase/PackageRentPlayButtonAction";
type Props = {
  data: any;
};
const PackageDetailsHeroImage = ({ data }: Props) => {
  // console.log('PackageDetailsHeroImage ', data)
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  const [hasMovieList, setHasMovieList] = React.useState(false);
  const [movieListOfset, setMovieListOfset] = React.useState(0);
  const movieId = data?._id || "";
  let thumb = getThumbnailLandscape(data);
  const isMobile = useIsMobile();
  let trailerUrl = "";
  if (data?.trailerUrl) {
    trailerUrl = data?.trailerUrl;
  }

  useEffect(() => {
    const movieListHeroBanner = document.querySelector(".movieListHeroBanner");
    if (
      movieListHeroBanner !== null &&
      movieListHeroBanner !== undefined &&
      movieListHeroBanner !== ""
    ) {
      setHasMovieList(true);
      setMovieListOfset(
        (movieListHeroBanner?.getBoundingClientRect()?.top || 0) +
          window.scrollY
      );
    }
  }, []);
  // console.log('PackageDetailsHeroBanner', movieListOfset, hasMovieList);
  return (
    <>
      {isMobile ? (
        <PackageDetailsHeroImageMobile data={data} />
      ) : (
        <>
          <DetailsHeroBanner thumb={thumb} videoURL={trailerUrl} />
          <div className="text-white max-w-[1600px] mx-auto px-[15px] z-10 relative my-4">
            <h1 className="text-2xl md:text-4xl h-full lg:text-5xl mb-2 lg:mb-3">
              {data?.title ? data.title : ""}
            </h1>
            {data?.packageShortDetails ? (
              <p className="mb-1 flex items-center flex-wrap my-2">
                <span className="text-gray-300 mr-2 text-xl">
                  {data?.packageShortDetails}
                </span>
              </p>
            ) : null}
          </div>
          <div className="text-white max-w-[1600px] mx-auto px-[15px] z-10 relative my-4">
            <RentPlayNotice data={data?.allowed} />
            {data?._id ? (
              <div className="flex flex-row gap-4 items-center lg:mb-5 flex-wrap">
                <div className="mr-2">
                    <PackageRentPlayButtonAction 
                        data={data} 
                        allowedData={data?.allowed}
                        size="lg"
                        />
                </div>
                {hasMovieList ? (
                  <>
                    <button
                      onClick={() => {
                        if (hasMovieList) {
                          window.scrollTo({
                            top: movieListOfset - 100,
                            behavior: "smooth",
                          });
                        }
                      }}
                      className="text-white py-1 text-base flex flex-row items-center justify-center transition min-w-[160px] h-[44px] border border-transparent rounded-full hover:border-white/40"
                    >
                      Movie List{" "}
                      <ChevronRightIcon className="w-5 h-5 ml-2 text-white/80" />
                    </button>
                  </>
                ) : null}
                <div className="flex flex-row gap-8 items-center mb-0 flex-wrap">
                  <FavoriteButton
                    movieId={movieId}
                    isInWatchList={data?.isInWatchList}
                  />
                  {data?._id ? (
                    <>
                      <button
                        onClick={handleToggle}
                        className="cursor-pointer group/item w-9 h-9 flex justify-center items-center transition"
                      >
                        <ShareIcon className="text-white group-hover/item:text-neutral-300 w-6" />
                      </button>
                      <SocialShare
                        open={open}
                        setOpen={setOpen}
                        url={`${process.env.NEXT_PUBLIC_SSO_DOMAIN}/details/${data?._id}`}
                        title={data?.title}
                      />
                    </>
                  ) : null}
                </div>
              </div>
            ) : (
              <ErrorPopUp
                message="Sorry, Something went wrong!"
                isRetry={false}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};
export default PackageDetailsHeroImage;