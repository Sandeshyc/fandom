import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonHeader from './Header';

const SkeletonMyProfile = () => {
  return (
    <>
      <SkeletonHeader/>
      <div className="pt-8 pb-16 bg-gradient-to-r from-[#210424] from-10% via-[#4B0F5A] via-30% to-[#271055] to-85% min-h-full">
        <div className={`px-4 md:px-12 mb-6`}>
          <div className="container mx-auto max-w-[996px]">
            <div className="w[80%] max-w-[200px]">
              <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[30px] lg:h-[40px] mb-6' />
            </div>
            <div className="lg:pl-6">
              <div className={`text-white max-w-[996px]`}>
                <div className="w[80%] max-w-[160px]">
                  <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[20px] mb-2' />
                </div>
                <div className={`p-4 border border-[#C6BCC6] rounded-md bg-[#767680] bg-opacity-[22%]`}>                
                  <div className="w[200px]">
                    <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[30px] lg:h-[40px] mb-4' />
                  </div>
                  <div className={`mt-2 flex flex-wrap`}>
                    <div className="w-[120px] mb-1">
                      <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[18px]' />
                    </div>
                    <div className="w-full mb-4">
                      <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[22px]' />
                    </div>
                    <div className="w-[120px] mb-1">
                      <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[18px]' />
                    </div>
                    <div className="w-full mb-4">
                      <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[22px]' />
                    </div>
                    <div className="w-[120px] mb-1">
                      <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[18px]' />
                    </div>
                    <div className="w-full mb-4">
                      <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[22px]' />
                    </div>
                    <div className='w-[50%] pr-2'>
                      <div className="w-[120px] mb-1">
                        <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[18px]' />
                      </div>
                      <div className="w-full mb-4">
                        <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[22px]' />
                      </div>
                    </div>
                    <div className='w-[50%] pl-2'>
                      <div className="w-[120px] mb-1">
                        <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[18px]' />
                      </div>
                      <div className="w-full mb-4">
                        <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[22px]' />
                      </div>
                    </div>
                    <div className="w-full mt-4">
                        <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[46px]' 
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
    </>
  )
}

export default SkeletonMyProfile