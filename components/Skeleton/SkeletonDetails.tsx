import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonSimpleCard from './SkeletonSimpleCard';
import {FilmReel} from '../../utils/CustomSVGs';
import MovieDetails from '@/components/Skeleton/MovieDetails';
import { useRouter } from 'next/router';

const SkeletonDetails = () => {
  const router = useRouter();
  return (
    <>
      <div className="movieSliderInner">
        <div className="w-full p-4 flex flex-wrap justify-center bg-gradient-to-b to-black from-gray-500">
          <div className='w-[200px] sm:w-[350px] xl:w-[450px] opacity-20'>
            <FilmReel/>
          </div>
          <div className='w-full pt-16'>
            <div className='container mx-auto'>
              <div className='max-w-[400px] w-[75%] mb-4'>
                <Skeleton baseColor='#333' highlightColor='#666' height={50}/>
              </div>
              <div className='w-full'>
                <div className='w-[280px] max-w-[70%] mr-2 mb-2'>
                  <Skeleton baseColor='#333' highlightColor='#666' height={20}/>
                </div>
                <div className='w-[200px] max-w-[50%] mr-2 mb-2'>
                  <Skeleton baseColor='#333' highlightColor='#666' height={20}/>
                </div>
                <div className='w-[330px] max-w-[70%] mr-2 mb-2'>
                  <Skeleton baseColor='#333' highlightColor='#666' height={20}/>
                </div>
              </div>
              <div className='flex flex-wrap mb-2 mt-8'>
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
    </>
  )
}

export default SkeletonDetails;