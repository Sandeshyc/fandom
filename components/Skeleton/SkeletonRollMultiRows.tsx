import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const SkeletonRollMultiRows = () => {
  return (
    <div className='relative my-8 lg:mt-[2vw] lg:mb-[3vw]'>
        <div className='flex items-center justify-between pr-4 lg:pr-8'>
            <p className="mb-1 lg:mb-4 mr-2 w-[200px]">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[36px]' />
            </p>
        </div>
        <div className='block lg:hidden'>
          <div className='flex lg:flex flex-wrap mx-[-10px]'>
            <div className='p-[10px] flex flex-col relative movieCard w-1/2 sm:w-1/3  md:w-1/4'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
            </div>
            <div className='p-[10px] flex flex-col relative movieCard w-1/2 sm:w-1/3  md:w-1/4'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
            </div>
            <div className='p-[10px] flex flex-col relative movieCard w-1/2 sm:w-1/3  md:w-1/4'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
            </div>
            <div className='p-[10px] flex flex-col relative movieCard w-1/2 sm:w-1/3  md:w-1/4'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
            </div>
            <div className='p-[10px] flex flex-col relative movieCard w-1/2 sm:w-1/3  md:w-1/4'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
            </div>
            <div className='p-[10px] flex flex-col relative movieCard w-1/2 sm:w-1/3  md:w-1/4'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
            </div>
          </div>
        </div>
        <div className='hidden lg:block'>
          <div className='flex flex-wrap mx-[-20px]'>
            <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 p-[20px]'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 p-[20px]'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 p-[20px]'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 p-[20px]'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 p-[20px]'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 p-[20px]'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 p-[20px]'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 p-[20px]'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div> 
            <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 p-[20px]'>
              <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
            </div>
          </div>
        </div>
    </div>
  )
}
export default SkeletonRollMultiRows