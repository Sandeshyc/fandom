import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonHeader from './Header';
const bgImage = 'url("/images/new-bg.png")';
const SkeletonMyProfileMobile = () => {
  return (
    <>
      <div className="py-16 pt-28 min-h-[80vh]"
      style={{
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'right '+ 30 + '%',
      }}>
        <SkeletonHeader/>
        <div className={`px-4 md:px-12 mb-6`}>
          <div className="container mx-auto max-w-[996px]">
            <div className="w-[80%] max-w-[300px] px-6">
              <Skeleton baseColor='#333' highlightColor='#666' className='h-[30px] lg:h-[40px] mb-4' />
            </div>
            <div className="lg:pl-6">
              <div className={`text-white max-w-[996px]`}>
                <div className={`p-4 border border-[#C6BCC6] rounded-md bg-[#767680] bg-opacity-[22%]`}>                
                  <div className="w-[200px]">
                    <Skeleton baseColor='#333' highlightColor='#666' className='h-[20px] lg:h-[40px] mb-4' />
                  </div>
                  <div className={`mt-2 flex flex-wrap`}>
                    <div className='w-[70%] md:w-[51%] pr-2'>
                      <div className="w-[120px] mb-1">
                        <Skeleton baseColor='#333' highlightColor='#666' className='h-[18px]' />
                      </div>
                      <div className="w-full mb-4">
                        <Skeleton baseColor='#333' highlightColor='#666' className='h-[22px]' />
                      </div>
                    </div>
                    <div className='w-[100%] md:w-[71%] pr-2'>
                      <div className="w-[120px] mb-1">
                        <Skeleton baseColor='#333' highlightColor='#666' className='h-[18px]' />
                      </div>
                      <div className="w-full mb-4">
                        <Skeleton baseColor='#333' highlightColor='#666' className='h-[22px]' />
                      </div>
                    </div>
                    <div className='w-[50%] md:w-[35%] pr-2'>
                      <div className="w-[120px] mb-1">
                        <Skeleton baseColor='#333' highlightColor='#666' className='h-[18px]' />
                      </div>
                      <div className="w-full mb-4">
                        <Skeleton baseColor='#333' highlightColor='#666' className='h-[22px]' />
                      </div>
                    </div>
                    <div className='w-[50%] md:w-[35%] pl-2'>
                      <div className="w-[120px] mb-1">
                        <Skeleton baseColor='#333' highlightColor='#666' className='h-[18px]' />
                      </div>
                      <div className="w-full mb-4">
                        <Skeleton baseColor='#333' highlightColor='#666' className='h-[22px]' />
                      </div>
                    </div>
                    <div className='w-full'>
                      <div className="w-[160px] mt-0">
                          <Skeleton baseColor='#333' highlightColor='#666' className='h-[46px]' 
                          style={{
                            borderRadius: '50px',
                          }}
                          />
                      </div>
                    </div>
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

export default SkeletonMyProfileMobile