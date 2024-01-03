import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonHeader from './Header';
import SkeletonPurchaseCard from './PurchaseCard';

const SkeletonPurchase = () => {
  return (
    <>
      <SkeletonHeader/>
      <div className="pb-12 pt-32">
        <div className={`px-4`}>
          <div className="movieSliderInner">
            <div className="w-[250px]">
              <Skeleton baseColor='#333' highlightColor='#666' className='h-[30px] lg:h-[40px] mb-4' />
            </div>
            <div className="flex flex-wrap">
              <div className='w-[150px] mr-4'>
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[30px] lg:h-[40px] mb-4' 
                borderRadius={50}/>
              </div>
              <div className='w-[150px]'>
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[30px] lg:h-[40px] mb-4' 
                borderRadius={50}/>
              </div>
            </div>
            <div className="flex flex-wrap">
              <SkeletonPurchaseCard count={12}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SkeletonPurchase