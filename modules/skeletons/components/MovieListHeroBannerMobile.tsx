import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FilmReel } from "@/utils/CustomSVGs";
import WatchAndBuy from "@/modules/skeletons/components/WatchAndBuy";
import ShareBtnGroup from "@/modules/skeletons/components/ShareBtnGroup";
const MovieListHeroBannerMobile = () => {
  return (
    <>
    <div className="relative billboardSec">
      <div
        className={`relative w-full overflow-hidden object-cover transition duration-500 jk_player min-h-[400px] h-[450px] sm:h-[550px] lg:h-[650px] xl:h-[100vh] bg-gradient-to-b to-black from-gray-500 flex justify-center items-center`}
      >
        <div className="w-[200px] sm:w-[350px] xl:w-[450px] opacity-20 flex justify-center items-center">
          <FilmReel />
        </div>
      </div>
      <div className={`absolute bottom-0 transition w-full`}>
        <div className='flex flex-wrap items-end lg:pb-2 container mx-auto px-4'>
            <div className='w-full lg:w-2/3 mb-4 lg:mb-0'>
              <div className="flex flex-wrap items-end w-full">
                <div className='w-[100px] sm:w-[120px] mr-3 aspect-[6/9] rounded-md overflow-hidden'>
                    <Skeleton baseColor='#333' highlightColor='#666' height='100%'/>
                </div>
                <div className='grow w-[100px] '>
                  <div className=' h-full mb-2 lg:mb-3'>
                    <div className='h-full mb-2 lg:mb-3 max-w-[200px]'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={30}/>
                    </div>
                  </div>
                    <p className='flex items-center flex-wrap my-2 text-white/70 text-xs'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50} className='mr-2'/>
                        <Skeleton baseColor='#333' highlightColor='#666' height={16} width={70}/>
                    </p>
                    <p className='flex items-center flex-wrap my-2 text-white/70 text-xs'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={16} width={70} className='mr-2'/>
                        <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50} className='mr-2'/>
                        <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50}/>
                    </p>
                </div>
              </div>
          </div>
        </div> 
      </div>
    </div>
    <WatchAndBuy/>
    <ShareBtnGroup/>
    </>
  );
};
export default MovieListHeroBannerMobile;
