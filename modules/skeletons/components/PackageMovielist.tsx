import MovieDetails from "@/components/Skeleton/MovieDetails";
import ReelHeading from "@/modules/skeletons/elements/ReelHeading";
import useIsMobile from "@/hooks/useIsMobile";
import MovieListHeroBanner from "@/modules/skeletons/components/MovieListHeroBanner";
import MovieListHeroBannerItems from "@/modules/skeletons/components/MovieListHeroBannerItems";
import PackageMovielistMobile from "@/modules/skeletons/components/PackageMovielistMobile";
const PackageMovielist = () => {
    const isMobile = useIsMobile();
    return (
        <>
        {(isMobile) ? <PackageMovielistMobile /> : 
        <div className={`my-[5vw] movieListHeroBanner`}>
          <div className="px-4 max-w-[1600px] mx-auto">
            <ReelHeading />
          </div>
          <div className='relative'>
            <MovieListHeroBanner />
            <div className="absolute left-0 right-0 bottom-0 pl-4 md:pl-16">
              <MovieListHeroBannerItems />              
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
export default PackageMovielist;