import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import MovieDetails from '@/components/Skeleton/MovieDetails';
import SkeletonSimpleCard from './SkeletonSimpleCard';

const SkeletonDetailsMobile = () => {
  return (
    <div className="bg-black h-screen">
        <div className={`fixed top-0 left-0 z-40 w-full py-4 bg-gradient-to-b from-black to-transparent`}>
            <div className='px-4'>
                <div className='flex items-center justify-center flex-wrap'>
                    <div className='mr-4'>
                        <div className="w-[90px] mr-2">
                            <Skeleton baseColor='#333' highlightColor='#666' className='h-[40px]'/>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className="w-[90px] mr-2">
                            <Skeleton baseColor='#333' highlightColor='#666' className='h-[20px]'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="relative z-0 mb-[-140px] md:mb-[-200px]">
            <div className="bg-gray-500 shadow-md rounded-t-lg jk_player h-[350px] md:h-[75vh] max-h-[100%] min-h-[400px] md:min-h-[700px]"></div>
            <div className="absolute bottom-0 left-0 w-full h-[300px] z-10 bg-gradient-to-t from-black from-30% to-transparent to-100%"/>  
        </div> 
        <div className="text-white max-w-[1600px] mx-auto px-[15px] z-10 relative my-4">
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
        </div>
        <div className='px-[15px] z-10 relative my-4 flex flex-wrap justify-between'>
            <div className="w-[50%]">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[44px]' borderRadius={50}/>
            </div>
            <div className="w-[48%]">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[44px]' borderRadius={50}/>
            </div>
        </div>
        <div className='px-[15px] z-10 mb-8'>
            <div className="flex justify-center items-end overflow-y-hidden overflow-x-auto my-4 relative z-10 border border-white/30 rounded-xl py-2">
                <div className="w-[50px]">
                    <Skeleton baseColor='#333' highlightColor='#666' className='h-[44px]'/>
                </div>
                <div className="w-[50px] ml-2">
                    <Skeleton baseColor='#333' highlightColor='#666' className='h-[44px]'/>
                </div>
            </div>
        </div>
        <div className='container mx-auto px-4 mt-16'>
            <MovieDetails/>
        </div>
        <div className="px-4 pb-8">
            <div className="w-[200px] pb-2">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[30px] w-full' />
            </div>
            <div className='flex overflow-y-hidden overflow-x-auto'>
                <SkeletonSimpleCard count={6}/> 
            </div>
        </div> 
    </div>
  )
}

export default SkeletonDetailsMobile