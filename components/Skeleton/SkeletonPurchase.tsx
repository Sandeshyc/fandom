import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonHeader from './Header';
import SkeletonPurchaseCard from './PurchaseCard';

const SkeletonPurchase = () => {
  return (
    <>
      <SkeletonHeader/>
      <div className="py-16">
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="movieSliderInner">
            <div className="w-[250px] lg:w-[450px] lg:px-6">
              <Skeleton baseColor='#aaa' highlightColor='#eee' className='h-[30px] lg:h-[40px] mb-4' />
            </div>
            <div className="lg:px-6 pb-6 flex flex-wrap">
              <SkeletonPurchaseCard count={12}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SkeletonPurchase