import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonHomeMobile = () => {
  return (
    <div className="bg-black h-screen">
        <div className="pt-2 px-4 flex flex-wrap justify-between">
            <div className='flex flex-wrap items-center pr-4'>
                <div className="w-[50px] mr-2">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[50px]' />
                </div>
                <div className="w-[80px]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[20px]' />
                </div>
            </div>
            <div className="w-[32px]">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[32px]' />
            </div>
        </div>
        <div className="pt-12 px-4">
            <div className="w-[250px] pb-4">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[40px] w-full' />
            </div>
            <div className="w-[70%] pb-2">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[16px] w-full' />
            </div>
            <div className="w-[75%] pb-2">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[16px] w-full' />
            </div>
            <div className="w-[70%] pb-2">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[16px] w-full' />
            </div>
            <div className="w-[60%] pb-2">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[16px] w-full' />
            </div>
        </div>
        <div className="pt-2 px-4 flex flex-wrap mb-8">
            <div className="w-[100px] pr-2">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[38px] w-full' />                
            </div>
            <div className="w-[100px]">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[38px] w-full' />                
            </div>
        </div>
        <div className="px-4 pb-8">
            <div className="w-[40%] pb-2">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[30px] w-full' />
            </div>
            <div className='flex flex-wrap justify-between'>
                <div className="w-[32%]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-video w-full' /> 
                </div> 
                <div className="w-[32%]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-video w-full' /> 
                </div>
                <div className="w-[32%]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-video w-full' /> 
                </div>
            </div>
        </div> 
        <div className="px-4 pb-8">
            <div className="w-[40%] pb-2">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[30px] w-full' />
            </div>
            <div className='flex flex-wrap justify-between'>
                <div className="w-[24%]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-[9/16] w-full' /> 
                </div> 
                <div className="w-[24%]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-[9/16] w-full' /> 
                </div>
                <div className="w-[24%]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-[9/16] w-full' /> 
                </div>
                <div className="w-[24%]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-[9/16] w-full' /> 
                </div>
            </div>
        </div> 
        <div className="px-4 pb-8">
            <div className="w-[40%] pb-2">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[30px] w-full' />
            </div>
            <div className='flex flex-wrap justify-between'>
                <div className="w-[32%]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-video w-full' /> 
                </div> 
                <div className="w-[32%]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-video w-full' /> 
                </div>
                <div className="w-[32%]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-video w-full' /> 
                </div>
            </div>
        </div> 
        <div className="px-4 pb-8">
            <div className="w-[40%] pb-2">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[30px] w-full' />
            </div>
            <div className='flex flex-wrap justify-between'>
                <div className="w-[24%]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-[9/16] w-full' /> 
                </div> 
                <div className="w-[24%]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-[9/16] w-full' /> 
                </div>
                <div className="w-[24%]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-[9/16] w-full' /> 
                </div>
                <div className="w-[24%]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='aspect-[9/16] w-full' /> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default SkeletonHomeMobile