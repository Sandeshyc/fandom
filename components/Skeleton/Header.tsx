import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonHeader = () => {
  return (
    <>
    <div className="pt-2 px-4 flex flex-wrap justify-between lg:hidden">
        <div className='flex flex-wrap items-center pr-4'>
            <div className="w-[50px] mr-2">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[50px]'/>
            </div>
            <div className="w-[80px]">
                <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[20px]' />
            </div>
        </div>
        <div className="w-[32px]">
            <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[32px]' />
        </div>
    </div>
    <div className='hidden lg:block fixed left-0 top-0 h-full w-[70px] pt-6 bg-gradient-to-r from-black to-transparent pl-1'>
        <Skeleton 
            baseColor='#aaa' 
            highlightColor='#eee' 
            style={{height: '65px', width: '65px', marginBottom: '30px'}}
        />
        <Skeleton 
            baseColor='#aaa' 
            highlightColor='#eee' 
            style={{height: '40px', width: '40px', marginBottom: '8px'}}
            count={10}
        />
    </div>
    </>
  )
}

export default SkeletonHeader