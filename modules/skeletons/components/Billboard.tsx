import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Billboard = () => {
    return (
        <div className={`relative billboardSec billboardSliderItem`}> 
            <div className='relative w-full overflow-hidden object-cover transition duration-500 jk_player min-h-[400px] h-[250px] sm:h-[300px] md:h-[85vh] md:min-h-[700px] max-h-[85vh]'>
            <div className='brightness-[60%] h-full'>
                <Skeleton baseColor='#333' highlightColor='#666' className='h-full' />
            </div>
            <div className='preview'></div>
            </div>
            <div className={`absolute bottom-[0%] pb-6 sm:pb-10 lg:pb-16 xl:pb-25 pl-4 md:pl-16 transition`}>
            <div className='mb-4 w-[90%] md:w-[80%] lg:w-[50%] xl:w-[40%] text-contentColor'>
                <div className="w-[400px] pb-4">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[48px] w-full' /> 
                </div>
                <div className="w-[500px] pb-4">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[18px] w-full' count={4}/>
                </div>
            </div> 
            <div className="flex flex-row items-center gap-3">
                <div className="w-[160px] mr-2">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[40px] w-full' borderRadius={50}/>
                </div> 
                <div className="w-[160px]">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[40px] w-full' borderRadius={50}/> 
                </div>   
            </div>  
            </div>
      </div>
    );
}
export default Billboard;