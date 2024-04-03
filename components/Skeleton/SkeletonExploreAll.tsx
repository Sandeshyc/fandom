import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonSimpleCard from './SkeletonSimpleCard';
import {FilmReel} from '../../utils/CustomSVGs';
import MovieDetails from '@/components/Skeleton/MovieDetails';
import { useRouter } from 'next/router';
import SkeletonHeader from '@/components/Skeleton/Header';
import SkeletonDetailsMobile from '@/components/Skeleton/SkeletonDetailsMobile';
import SkeletonRollMultiRows from '@/components/Skeleton/SkeletonRollMultiRows';

const SkeletonExploreAll = () => {
  const router = useRouter();
  return (
    <>
      <div className="lg:hidden  min-h-screen">
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
        <div className={`min-h-[95vh] z-10 relative px-4 max-w-[2400px] mx-auto mt-[90px]`}>
          <SkeletonRollMultiRows/>
        </div>
      </div>
      <div className="hidden lg:block">
        <SkeletonHeader/>
        <div className={`min-h-[95vh] z-10 relative px-4 max-w-[2400px] mx-auto mt-[120px]`}>
          <SkeletonRollMultiRows/>
        </div>
      </div>
    </>
  )
}

export default SkeletonExploreAll;