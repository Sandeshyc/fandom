import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const MovieDetails = () => {
    return (
        <>
        <div className='text-white z-10 relative bg-gradient-to-t from-black/90 from-30% to-transparent to-75% mt-12'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-wrap items-end pb-4 lg:pb-8'>
                    <div className='w-full lg:w-2/3 mb-4 lg:mb-0'>
                        <div className="flex flex-wrap items-end w-full">
                            <div className='w-[100px] sm:w-[120px] mr-3 bg-zinc-700 aspect-[6/9] rounded-md overflow-hidden'>
                                <Skeleton baseColor='#333' highlightColor='#666' height='100%'/>
                            </div>
                            <div className='grow w-[100px]'>
                                <div className=' h-full mb-2 lg:mb-3'>
                                    <div className='h-full mb-2 lg:mb-3 max-w-[260px]'>
                                        <Skeleton baseColor='#333' highlightColor='#666' height={40}/>
                                    </div>
                                </div>
                                <p className='flex items-center flex-wrap my-2 text-white/70 text-xs'>
                                    <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50} className='mr-2'/>
                                    <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50} className='mr-2'/>
                                    <Skeleton baseColor='#333' highlightColor='#666' height={16} width={70}/>
                                </p>
                            </div>
                        </div>                
                    </div>
                </div>
            </div>
        </div>
        <div className='text-white z-10 relative bg-gradient-to-t from-black from-50% to-black/90 to-100% pb-8'>
                <div className='container mx-auto px-4'>                    
                    <div className='w-full flex flex-wrap items-center'>      
                        <div className='w-[120px] mr-2 lg:w-[140px] lg:mr-4'>
                            <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                        </div>
                        <div className='w-[120px] mr-2 lg:w-[140px] lg:mr-4'>
                            <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                        </div>
                        <div className='w-[120px] mr-2 lg:w-[140px] lg:mr-4'>
                            <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                        </div>
                        <div className='w-[40px]'>
                            <Skeleton baseColor='#333' highlightColor='#666' height={40} borderRadius={50}/>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={20} count={4}/>
                    </div>
                </div>
            </div>
        </>
    )
};
export default MovieDetails;