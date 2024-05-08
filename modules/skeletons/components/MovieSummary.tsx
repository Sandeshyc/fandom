import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const MovieSummary= () => {
    return (
    <div className='text-white z-10 relative mt-[-100px] md:mt-[-250px] bg-gradient-to-t from-black/90 from-50% to-transparent to-100%'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap items-end pb-4 lg:pb-8'>
            <div className='w-full lg:w-2/3 mb-4 lg:mb-0'>
              <div className="flex flex-wrap items-end w-full">
                <div className='w-[100px] sm:w-[120px] mr-3 aspect-[6/9] rounded-md overflow-hidden'>
                    <Skeleton baseColor='#333' highlightColor='#666' height='100%'/>
                </div>
                <div className='grow w-[100px] '>
                  <div className=' h-full mb-2 lg:mb-3'>
                    <div className='h-full mb-2 lg:mb-3 max-w-[200px]'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={30}/>
                    </div>
                  </div>
                    <p className='flex items-center flex-wrap my-2 text-white/70 text-xs'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50} className='mr-2'/>
                        <Skeleton baseColor='#333' highlightColor='#666' height={16} width={70}/>
                    </p>
                    <p className='flex items-center flex-wrap my-2 text-white/70 text-xs'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={16} width={70} className='mr-2'/>
                        <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50} className='mr-2'/>
                        <Skeleton baseColor='#333' highlightColor='#666' height={16} width={50}/>
                    </p>
                </div>
              </div>                
            </div>
          </div>
        </div>
      </div>      
    );
}
export default MovieSummary;