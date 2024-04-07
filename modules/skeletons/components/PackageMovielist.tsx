import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieDetails from "@/components/Skeleton/MovieDetails";
import DetailsHeroImage from "@/modules/skeletons/components/DetailsHeroImage";
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
        <div className='relative my-8 lg:mt-[2vw] lg:mb-[3vw] pl-4 lg:pl-8'>
            <div className='flex items-center justify-between pr-4 lg:pr-8'>
                <p className="mb-1 lg:mb-4 mr-2 w-[200px]">
                    <Skeleton baseColor='#333' highlightColor='#666' className='h-[36px]' />
                </p>
            </div>
        </div>
        <DetailsHeroImage />
        <div className='text-white z-10 relative mt-[-100px] md:mt-[-250px] bg-gradient-to-t from-black/90 from-50% to-transparent to-100%'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-wrap items-end pb-4 lg:pb-8'>
                    <div className='w-full lg:w-2/3 mb-4 lg:mb-0'>
                        <div className="flex flex-wrap items-end w-full">
                            <div className='w-[100px] sm:w-[120px] mr-3 aspect-[6/9] rounded-md overflow-hidden'>
                                <Skeleton baseColor='#333' highlightColor='#666' height='100%'/>
                            </div>
                            <div className='grow w-[100px]'>
                                <div className=' h-full mb-2 lg:mb-3'>
                                    <div className='h-full mb-2 lg:mb-3 max-w-[260px]'>
                                        <Skeleton baseColor='#333' highlightColor='#666' height={40}/>
                                    </div>
                                </div>
                                <p className='flex items-center flex-wrap my-2 text-white/70 text-xs'>
                                    <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50} className='mr-2'/>
                                    <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50} className='mr-2'/>
                                    <Skeleton baseColor='#333' highlightColor='#666' height={16} width={70}/>
                                </p> 
                            </div>
                        </div> 
                        <div className='w-full mt-4 lg:mt-8 flex flex-wrap items-center'>
                            <div className='flex flex-wrap'>
                                <div className='w-[120px] mr-2 lg:w-[140px] lg:mr-4'>
                                    <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                                </div>
                                <div className='w-[120px] mr-2 lg:w-[140px] lg:mr-4'>
                                    <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                                </div>
                                <div className='w-[40px]'>
                                    <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                                </div>
                            </div>              
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='relative mt-[-20px] z-20 bg-black'>
            <div className='block lg:hidden'>
                <div className='flex overflow-y-hidden overflow-x-auto mobileCardsSlide'>
                    <div className='aspect-[6/9] min-w-[150px] mr-2'>
                    <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
                    </div>
                    <div className='aspect-[6/9] min-w-[150px] mr-2'>
                    <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
                    </div>
                    <div className='aspect-[6/9] min-w-[150px] mr-2'>
                    <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
                    </div>
                    <div className='aspect-[6/9] min-w-[150px] mr-2'>
                    <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
                    </div>
                    <div className='aspect-[6/9] min-w-[150px] mr-2'>
                    <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
                    </div>
                    <div className='aspect-[6/9] min-w-[150px] mr-0'>
                    <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
                    </div>
                </div>
            </div>
            <div className='hidden lg:block'>
            <Slider
            {...settings}>
                <div>
                <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
                </div> 
                <div>
                <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
                </div> 
                <div>
                <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
                </div> 
                <div>
                <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
                </div> 
                <div>
                <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
                </div> 
                <div>
                <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
                </div> 
                <div>
                <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
                </div> 
                <div>
                <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
                </div> 
                <div>
                <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
                </div>
            </Slider>
            </div>
        </div>
        <div className='bg-black text-white pt-12'>      
            <div className="container mx-auto px-4">
                <MovieDetails />
            </div>
        </div>
        </>
    )
}
export default PackageMovielist;