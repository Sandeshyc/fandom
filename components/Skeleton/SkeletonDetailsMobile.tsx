import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import MovieDetails from '@/components/Skeleton/MovieDetails';

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
            <div className="w-[200px] mr-2 mb-2">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[26px]'/>
            </div>
            <div className="w-[150px] mr-2">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[14px]'/>
            </div>
            <div className="flex flex-row items-center mb-1">
                <div className="w-[80px] mr-2">
                    <Skeleton baseColor='#333' highlightColor='#666' className='h-[20px]'/>
                </div>
                <div className="w-[20px] mr-2">
                    <Skeleton baseColor='#333' highlightColor='#666' className='h-[20px]'/>
                </div>
                <div className="w-[20px] mr-2">
                    <Skeleton baseColor='#333' highlightColor='#666' className='h-[20px]'/>
                </div>
            </div>      
            <div className="w-[80px] mr-2">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[16px]'/>
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
        <MovieDetails/>
        <div className="px-4 pb-8">
            <div className="w-[200px] pb-2">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[30px] w-full' />
            </div>
            <div className='flex overflow-y-hidden overflow-x-auto'>
                <div className="min-w-[220px] w-[220px] mr-2">
                    <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[384/216] w-full' /> 
                </div> 
                <div className="min-w-[220px] w-[220px] mr-2">
                    <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[384/216] w-full' /> 
                </div> 
                <div className="min-w-[220px] w-[220px] mr-2">
                    <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[384/216] w-full' /> 
                </div> 
                <div className="min-w-[220px] w-[220px] mr-2">
                    <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[384/216] w-full' /> 
                </div> 
                <div className="min-w-[220px] w-[220px] mr-2">
                    <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[384/216] w-full' /> 
                </div> 
            </div>
        </div> 
    </div>
  )
}

export default SkeletonDetailsMobile