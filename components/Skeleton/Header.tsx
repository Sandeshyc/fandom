import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonHeader = () => {
  return (
    <>
    <div 
      className={`w-full py-4 border-b border-white/40 fixed z-50 top-0 left-0 bg-gradient-to-b from-black/40 from-70% to-transparent to-100%`}>
        <div
        className='px-4'>
            <div className='flex items-center justify-between flex-wrap'>
              <div className='flex items-center'>
                <div className='mr-8'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={50} width={120}/>
                </div>
                <div className='ml-8'>
                  <div className='flex flex-row items-center gap-7'>
                    <div className='mr-2'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={18} width={80}/>
                    </div>
                    <div className='mr-2'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={18} width={80}/>
                    </div>
                    <div className='mr-2'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={18} width={80}/>
                    </div>
                    <div className='mr-0'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={18} width={80}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-end'>
                  <div className=''>
                    <div className='flex flex-row items-center'>
                      <div className='mr-6'>
                        <div>
                            <Skeleton baseColor='#333' highlightColor='#666' height={40} width={40} borderRadius={50}/>
                        </div>
                      </div>
                        <div className='mr-6'>
                            <Skeleton baseColor='#333' highlightColor='#666' height={40} width={80} borderRadius={50}/>
                        </div>
                        <div className='mr-6'>
                            <Skeleton baseColor='#333' highlightColor='#666' height={40} width={40} borderRadius={50}/>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default SkeletonHeader