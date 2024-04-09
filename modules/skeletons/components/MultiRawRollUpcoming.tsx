import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import EventRollCard from "@/modules/skeletons/elements/EventRollCard";
const MultiRawRollUpcoming = () => {
    return (
        <div className='relative mt-[80px] lg:mt-[120px] my-8 lg:mb-[3vw] px-4 lg:px-8 max-w-[2400px] mx-auto'>
            <div className='flex items-center justify-between pr-4 lg:pr-8'>
                <p className="mb-1 lg:mb-4 mr-2 w-[200px]">
                    <Skeleton baseColor='#333' highlightColor='#666' className='h-[36px]' />
                </p>
                <span className='mb-2 lg:mb-4 w-[100px]'>
                    <Skeleton baseColor='#333' highlightColor='#666' className='h-[20px]' />
                </span>
            </div>
            <div className='block lg:hidden'>
              <div className='flex flex-wrap'>
                  {(new Array(8)).fill(0).map((_, index) => (
                    <div className='w-1/2 sm:w-1/3 lg:w-1/4 2xl:w-1/6 p-[7px] lg:p-[15px] aspect-[6/9] min-w-[150px]'>
                      <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] w-full' /> 
                    </div>
                  ))  
                  } 
              </div>
            </div>
            <div className='hidden lg:block'>
              <div className='flex flex-wrap mx-[-7px] lg:mx-[-15px]'>
                  {(new Array(9)).fill(0).map((_, index) => (
                    <div className='w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 p-[7px] lg:p-[15px] pt-0'>
                      <EventRollCard/> 
                    </div>
                  ))  
                  }                  
              </div>
            </div>
        </div>
    );
}
export default MultiRawRollUpcoming;