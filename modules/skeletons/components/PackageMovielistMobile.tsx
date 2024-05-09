import MovieDetails from "@/components/Skeleton/MovieDetails";
import ReelHeading from "@/modules/skeletons/elements/ReelHeading";
import useIsMobile from "@/hooks/useIsMobile";
import MovieListHeroBannerMobile from "@/modules/skeletons/components/MovieListHeroBannerMobile";
import MovieListHeroBannerItemsMobile from "@/modules/skeletons/components/MovieListHeroBannerItemsMobile";
import PackageMovielist from "@/modules/skeletons/components/PackageMovielist";
const PackageMovielistMobile = () => {
    const isMobile = useIsMobile();
    return (
        <>
        {(!isMobile) ? <PackageMovielist /> :
        <div className={`my-[5vw] movieListHeroBanner`}>
          <div className="px-4 max-w-[1600px] mx-auto">
            <ReelHeading />
          </div>
          <div className='relative bg-black'>
            <MovieListHeroBannerMobile />
            <div className="pl-4 mt-[-30px]">
              <MovieListHeroBannerItemsMobile />              
            </div>
          </div>
          <div className='bg-black text-white pt-8'>      
              <div className="container mx-auto px-4">
                  <MovieDetails />
              </div>
          </div>
        </div>
        }
        </>
    )
}
export default PackageMovielistMobile;