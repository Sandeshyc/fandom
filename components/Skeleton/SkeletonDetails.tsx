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
        <div className="movieSliderInner">
          <div className="w-full p-4 flex flex-wrap flex-col justify-between bg-gradient-to-b to-black from-gray-500 h-[350px] md:h-[75vh] max-h-[100%] min-h-[400px] md:min-h-[700px]">
            <div className='flex justify-center grow h-[150px]'>
              <div className='w-[200px] sm:w-[350px] xl:w-[450px] opacity-20 flex justify-center items-center'>
                <FilmReel/>
              </div>
            </div>
            <div className='w-full pt-16 mb-[-15px]'>
              <div className='max-w-[1600px] mx-auto'>
                <div className='max-w-[400px] w-[75%] mb-4'>
                  <Skeleton baseColor='#333' highlightColor='#666' height={40}/>
                </div>
                <div className='w-full'>
                  <div className='w-[280px] max-w-[70%] mr-2 mb-1'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={16}/>
                  </div>
                  <div className='w-[200px] max-w-[50%] mr-2 mb-1'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={16}/>
                  </div>
                  <div className='w-[330px] max-w-[70%] mr-2 mb-0'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={16}/>
                  </div>
                </div>
                <div className='flex flex-wrap mt-4'>
                  <div className='w-[150px] mr-2'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                  </div>
                  <div className='w-[150px] mr-8'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                  </div>
                  <div className='w-[300px] flex flex-wrap'>
                    <div className='w-[40px] mr-4'>
                      <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                    </div>
                    <div className='w-[40px] mr-4'>
                      <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                    </div>
                    <div className='w-[40px] mr-4'>
                      <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MovieDetails/>
          <div className="shadow-md rounded-b-lg mt-16 my-6 px-4">
            <div className='container mx-auto'>
              <div className="flex flex-wrap justify-between mb-4">
                <div className='w-[60%] max-w-[300px] mr-2'>
                  <Skeleton baseColor='#333' highlightColor='#666' height={40}/>
                </div>
              </div>
              <div 
                className="
                  flex 
                  overflow-x-auto 
                  lg:flex-wrap 
                  lg:justify-between
                  lg:overflow-hidden">
                <SkeletonSimpleCard count={6}/>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </>
  )
}

export default SkeletonDetails;