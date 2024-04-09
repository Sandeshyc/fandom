import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const EventRollCard = () => {
    return (
        <div className={`group sm:h-full bg-zinc-900 rounded-md relative border border-contentColor/10`}>
            <div className="flex flex-wrap flex-col sm:flex-row sm:h-full">
                <div className="w-full h-auto sm:w-1/3 sm:bg-[#333] sm:aspect-[6/9] sm:scale-105 cursor-pointer relative">
                    <Skeleton baseColor='#333' highlightColor='#666' className='h-full w-full' />
                </div>
                <div className="sm:w-2/3 p-4">
                <div className='w-[90%] mb-2'>
                    <Skeleton baseColor='#333' highlightColor='#666' className='h-[30px] w-full' />
                </div>
                <div className='mb-4'>
                    <Skeleton baseColor='#333' highlightColor='#666' className='h-[18px] w-full' count={3}/> 
                </div>  
                <div className="flex flex-row items-center sm:justify-end gap-2 mt-4">
                    <div className="w-[100px]">
                    <Skeleton baseColor='#333' highlightColor='#666' className='h-[40px] w-full' borderRadius={50}/> 
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
export default EventRollCard;