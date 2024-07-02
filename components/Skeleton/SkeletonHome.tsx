import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonHomeDesktop from './Home/Desktop'
import SkeletonHomeMobile from './Home/Mobile'

const SkeletonHome = () => {
  return (
    <>
    <div className="hidden lg:block">
      <SkeletonHomeDesktop/>
    </div>
    <div className="lg:hidden">
      <SkeletonHomeMobile/>
    </div>
    </>
  )
}

export default SkeletonHome