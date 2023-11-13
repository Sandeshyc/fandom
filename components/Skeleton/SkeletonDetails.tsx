import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonSimpleCard from './SkeletonSimpleCard';
import {FilmReel} from '../../utils/CustomSVGs';

const SkeletonDetails = () => {
  return (
    <>
      <div className="movieSliderInner">
        <div className="w-full p-4 flex flex-wrap justify-center bg-gradient-to-b to-black from-gray-500">
          <div className='w-[200px] sm:w-[350px] xl:w-[450px] opacity-20'>
            <FilmReel/>
          </div>
          <div className='w-full pt-16'>
            <div className='container mx-auto'>
              <div className='max-w-[350px] w-[75%] mb-2'>
                <Skeleton baseColor='#333' highlightColor='#666' height={50}/>
              </div>
              <div className='flex flex-wrap mb-2'>
                <div className='w-[120px] mr-2'>
                  <Skeleton baseColor='#333' highlightColor='#666' height={40}/>
                </div>
                <div className='w-[120px] mr-2'>
                  <Skeleton baseColor='#333' highlightColor='#666' height={40}/>
                </div>
                <div className='w-[300px] flex flex-wrap'>
                  <div className='w-[40px] mr-2'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                  </div>
                  <div className='w-[40px] mr-2'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                  </div>
                  <div className='w-[40px] mr-2'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                  </div>
                </div>
              </div>
              <div className='flex flex-wrap'>
                <div className='w-full sm:w-[65%]'>
                  <div className='w-[300px] max-w-[70%] mr-2'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={18}/>
                  </div>
                  <div className='w-[350px] max-w-[70%] mr-4'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={14}/>
                  </div>
                  <div className='w-[700px] max-w-full mr-2'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={14} count={3}/>
                  </div>
                </div>
                <div className='w-[60%] sm:w-[35%] flex items-end sm:pl-8'>
                  <div className='w-[700px] max-w-full mr-2'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={14} count={3}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="shadow-md rounded-b-lg my-6 px-4">
          <div className='container mx-auto'>
            <div className="flex flex-wrap justify-between mb-4">
              <div className='w-[60%] max-w-[300px] mr-2'>
                <Skeleton baseColor='#333' highlightColor='#666' height={30}/>
              </div>
              <div className='w-[40%] max-w-[200px] ml-2'>
                <Skeleton baseColor='#333' highlightColor='#666' height={30}
                  style={{marginLeft: 'auto', marginRight: 'auto'}}
                />
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