import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonSimpleCard from './SkeletonSimpleCard';
import {FilmReel} from '../../utils/CustomSVGs';
import MovieDetails from '@/components/Skeleton/MovieDetails';
import { useRouter } from 'next/router';
import SkeletonHeader from '@/components/Skeleton/Header';
import SkeletonDetailsMobile from '@/components/Skeleton/SkeletonDetailsMobile';

const SkeletonDetails = () => {
  const router = useRouter();
  return (
    <>
      <div className="lg:hidden">
        <SkeletonDetailsMobile/>
      </div>
      <div className="hidden lg:block">
        <SkeletonHeader/>
        <div className="movieSliderInner mb-[-100px] md:mb-[-180px]">
          <div className="w-full p-4 flex flex-wrap flex-col justify-between bg-gradient-to-b to-black from-gray-500 h-[350px] md:h-[75vh] max-h-[100%] min-h-[400px] md:min-h-[700px]">
            <div className='flex justify-center grow h-[150px]'>
              <div className='w-[200px] sm:w-[350px] xl:w-[450px] opacity-20 flex justify-center items-center'>
                <FilmReel/>
              </div>
            </div>
          </div>
        </div>
        <div className='text-white z-10 relative mt-[-100px] md:mt-[-250px]'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-wrap items-end pb-4 lg:pb-8'>
              <div className='w-full lg:w-2/3 mb-4 lg:mb-0'>
                <div className="flex flex-wrap items-end w-full">
                  <div className='w-[100px] sm:w-[120px] mr-3 aspect-[6/9] rounded-md overflow-hidden'>
                    <Skeleton baseColor='#333' highlightColor='#666' height='100%'/>
                  </div>
                  <div className='grow w-[100px] '>
                    <div className='h-full mb-2 lg:mb-3 max-w-[260px]'>
                      <Skeleton baseColor='#333' highlightColor='#666' height={40}/>
                    </div>
                    <div className='h-full mb-2 lg:mb-2 max-w-[240px]'>
                      <Skeleton baseColor='#333' highlightColor='#666' height={20}/>
                    </div>
                    <p className='flex items-center flex-wrap my-2 text-white/70 text-xs'>
                      <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50} className='mr-2'/>
                      <Skeleton baseColor='#333' highlightColor='#666' height={16} width={100}/>
                    </p> 
                    <p className='flex items-center flex-wrap my-2 text-white/70 text-xs'>
                      <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50} className='mr-2'/>
                      <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50} className='mr-2'/>
                      <Skeleton baseColor='#333' highlightColor='#666' height={16} width={70}/>
                    </p>                         
                  </div>
                </div> 
                <div className='flex flex-wrap mt-4'>
                  <div className='w-[150px] mr-4'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                  </div>
                  <div className='w-[150px] mr-4'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                  </div>
                  <div className='w-[150px] mr-4'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                  </div>
                  <div className='w-[300px] flex flex-wrap'>
                    <div className='w-[40px]'>
                      <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                    </div>
                  </div>
                </div>               
              </div>
            </div>
            <MovieDetails/>
            <div className='my-8'>
              <div className="flex flex-wrap justify-between mb-4">
                <div className='w-[60%] max-w-[300px] mr-2'>
                  <Skeleton baseColor='#333' highlightColor='#666' height={40}/>
                </div>
              </div>
              <div 
                className="
                  flex 
                  overflow-x-auto
                  justify-start
                  lg:justify-between
                  lg:overflow-hidden">
                  <div className="min-w-[340px] w-[340px] mr-2">
                      <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[384/216] w-full' /> 
                  </div> 
                  <div className="min-w-[340px] w-[340px] mr-2">
                      <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[384/216] w-full' /> 
                  </div> 
                  <div className="min-w-[340px] w-[340px] mr-2">
                      <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[384/216] w-full' /> 
                  </div> 
                  <div className="min-w-[340px] w-[340px] mr-2">
                      <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[384/216] w-full' /> 
                  </div> 
                  <div className="min-w-[340px] w-[340px] mr-2">
                      <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[384/216] w-full' /> 
                  </div>
              </div>
            </div> 
          </div>
        </div>

      </div>
    </>
  )
}

export default SkeletonDetails;