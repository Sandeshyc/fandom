import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonRoll from '@/components/Skeleton/SkeletonRoll';

const SkeletonHomeMobile = () => {
  return (
    <div className="bg-black min-h-screen bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]">
        <div className={`fixed top-0 left-0 z-40 w-full py-4 bg-gradient-to-b from-black to-transparent`}>
            <div className='px-4'>
                <div className='flex items-center justify-center flex-wrap'>
                    <div className='mr-4'>
                        <div className="w-[90px] mr-2">
                            <Skeleton baseColor='#333' highlightColor='#666' className='h-[40px]'/>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className="w-[90px] mr-2">
                            <Skeleton baseColor='#333' highlightColor='#666' className='h-[20px]'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='bg-gradient-to-t from-black from-50% to-gray-800 to-100% overflow-hidden'>
            <div className='pt-[85px]'>
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
        <SkeletonRoll/>
        <SkeletonRoll/>
        <SkeletonRoll/>
        <SkeletonRoll/>
    </div>
  )
}

export default SkeletonHomeMobile