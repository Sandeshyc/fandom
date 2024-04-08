import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonRoll from '@/components/Skeleton/SkeletonRoll';
const Carousel = () => {
    return (
        <div className='bg-gradient-to-t from-black from-50% to-gray-800 to-100% overflow-hidden'>
            <div className='pt-[50px]'>
                <div className='flex items-center justify-center relative'>
                    <div className="w-[55vw] absolute left-0"
                    style={{
                        transform: 'translateY(-50%)',
                        top: '50%',
                    }}>
                        <Skeleton baseColor='#222' highlightColor='#555' className='aspect-[6/9] rounded-md'/>
                    </div>
                    <div className="w-[65vw] relative z-10 rounded-md">
                        <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[6/9] rounded-md'/>
                        <div className='absolute bottom-0 left-0 w-full p-2 pb-4 pt-12 bg-gradient-to-t from-black/60 from-60% to-transparent to-85% text-center'>
                            <div className='w-[60%] mx-auto'>
                                <Skeleton baseColor='#777' highlightColor='#aaa' className='h-[20px]'/>
                            </div>
                            <div className='flex justify-center mt-2'>
                                <div className='w-[30px]'>
                                    <Skeleton baseColor='#777' highlightColor='#aaa' className='h-[30px]' borderRadius={50}/>
                                </div>
                                <div className='w-[30px] mx-2'>
                                    <Skeleton baseColor='#777' highlightColor='#aaa' className='h-[30px]' borderRadius={50}/>
                                </div>
                                <div className='w-[30px]'>
                                    <Skeleton baseColor='#777' highlightColor='#aaa' className='h-[30px]' borderRadius={50}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[55vw] absolute right-0"
                    style={{
                        transform: 'translateY(-50%)',
                        top: '50%',
                    }}>
                        <Skeleton baseColor='#222' highlightColor='#555' className='aspect-[6/9] rounded-md'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Carousel;