import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieDetails from "@/components/Skeleton/MovieDetails";
import DetailsHeroImage from "@/modules/skeletons/components/DetailsHeroImage";
import ReelHeading from "@/modules/skeletons/elements/ReelHeading";
import useIsMobile from "@/hooks/useIsMobile";
import MovieListHeroBanner from "@/modules/skeletons/components/MovieListHeroBanner";
let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8.2,
    slidesToScroll: 8,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 3200,
        settings: {
          slidesToShow: 6.2,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 2400,
        settings: {
          slidesToShow: 5.2,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 4.3,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3.3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2.3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
    ]
  }; 
const PackageMovielist = () => {
    return (
        <>
        <div className={`my-[5vw] movieListHeroBanner`}>
          <div className="px-4 max-w-[1600px] mx-auto">
            <ReelHeading />
          </div>
          <div className='relative'>
            <MovieListHeroBanner />
            <div className="absolute left-0 right-0 bottom-0 pl-4 md:pl-16">
              <div className='relative mt-[-20px] z-20 bg-black'>
                  <div className='block lg:hidden'>
                      <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide'>
                          <div className='aspect-[6/9] min-w-[150px] mr-2'>
                          <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
                          </div>
                      </div>
                  </div>
                  <div className='hidden lg:block'>
                  <Slider
                  {...settings}>
                      {Array(10).fill(0).map((_,i) => (
                        <div>
                        <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
                        </div>
                        ))} 
                  </Slider>
                  </div>
              </div>
            </div>
          </div>
          <div className='bg-black text-white pt-12'>      
              <div className="container mx-auto px-4">
                  <MovieDetails />
              </div>
          </div>
        </div>
        </>
    )
}
export default PackageMovielist;