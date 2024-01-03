import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonHeader from '@/components/Skeleton/Header';

const SkeletonHomeDesktop = () => {
  return (
    <div className="bg-black">
      <SkeletonHeader/>
      <div className="pt-20 px-12">
        <div className='flex flex-col justify-end h-[350px] md:h-[75vh] max-h-[100%] min-h-[400px] md:min-h-[700px]'>
          <div className="w-[500px] pb-4">
            <Skeleton baseColor='#333' highlightColor='#666' className='h-[40px] w-full' /> 
          </div>     
          <div className="w-[900px] mb-0">
            <Skeleton baseColor='#333' highlightColor='#666' className='h-[14px] w-full' /> 
          </div>  
          <div className="w-[820px] mb-0">
            <Skeleton baseColor='#333' highlightColor='#666' className='h-[14px] w-full' /> 
          </div>  
          <div className="w-[875px] mb-0">
            <Skeleton baseColor='#333' highlightColor='#666' className='h-[14px] w-full' /> 
          </div>  
          <div className="w-[700px] mb-6">
            <Skeleton baseColor='#333' highlightColor='#666' className='h-[14px] w-full' /> 
          </div>  
          <div className="flex flex-wrap">
            <div className="w-[160px] mr-2">
              <Skeleton baseColor='#333' highlightColor='#666' className='h-[48px] w-full' borderRadius={50}/>
            </div> 
            <div className="w-[160px]">
              <Skeleton baseColor='#333' highlightColor='#666' className='h-[48px] w-full' borderRadius={50}/> 
            </div>   
          </div> 
        </div>
        <div className="w-[300px] mt-16 pb-4">
          <Skeleton baseColor='#333' highlightColor='#666' className='h-[45px] w-full' />
        </div>
        <div className='flex flex-wrap justify-between pb-20'>
          <div className="w-[15%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
          </div> 
          <div className="w-[15%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
          </div> 
          <div className="w-[15%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
          </div> 
          <div className="w-[15%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
          </div> 
          <div className="w-[15%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
          </div> 
          <div className="w-[15%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
          </div>
        </div>
        <div className="w-[500px] pb-4">
          <Skeleton baseColor='#333' highlightColor='#666' className='h-[45px] w-full' />
        </div>
        <div className='flex flex-wrap justify-between pb-20'>
          <div className="w-[9%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[9/16] w-full' /> 
          </div> 
          <div className="w-[9%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[9/16] w-full' /> 
          </div>
          <div className="w-[9%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[9/16] w-full' /> 
          </div>
          <div className="w-[9%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[9/16] w-full' /> 
          </div>
          <div className="w-[9%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[9/16] w-full' /> 
          </div>
          <div className="w-[9%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[9/16] w-full' /> 
          </div>
          <div className="w-[9%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[9/16] w-full' /> 
          </div>
          <div className="w-[9%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[9/16] w-full' /> 
          </div>
          <div className="w-[9%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[9/16] w-full' /> 
          </div>
          <div className="w-[9%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[9/16] w-full' /> 
          </div>
        </div>  
        <div className="w-[300px] pb-4">
          <Skeleton baseColor='#333' highlightColor='#666' className='h-[45px] w-full' />
        </div>
        <div className='flex flex-wrap justify-between pb-20'>
          <div className="w-[15%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
          </div> 
          <div className="w-[15%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
          </div> 
          <div className="w-[15%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
          </div> 
          <div className="w-[15%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
          </div> 
          <div className="w-[15%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
          </div> 
          <div className="w-[15%]">
            <Skeleton baseColor='#333' highlightColor='#666' className='aspect-video w-full' /> 
          </div>
        </div>
      </div>     
    </div>
  )
}

export default SkeletonHomeDesktop