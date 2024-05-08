import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const WatchAndshare = () => {
    return (
        <div className='text-white z-10 relative bg-gradient-to-t from-black from-50% to-black/90 to-100% pb-8'>
          <div className='container mx-auto px-4'>
            <div className='w-full flex flex-wrap items-center'>      
                <div className='w-[120px] mr-2 lg:w-[180px] lg:mr-4'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                </div>
                <div className='w-[120px] mr-2 lg:w-[180px] lg:mr-4'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                </div>
                <div className='w-[120px] mr-2 lg:w-[150px] lg:mr-4'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                </div>
                <div className='w-[40px]'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                </div>
            </div>
          </div>
        </div>
    );
}
export default WatchAndshare;