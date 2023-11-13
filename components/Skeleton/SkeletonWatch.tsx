import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {FilmReel} from '../../utils/CustomSVGs';

const SkeletonWatch = () => {
  return (
    <>
      <div className="movieSliderInner">
        <div className="w-full h-[100vh] p-4 flex flex-wrap justify-center items-center bg-gradient-to-b to-black from-gray-500">
          <div className='w-[200px] sm:w-[350px] xl:w-[450px] bg-opacity-20'>
            <div className='opacity-30'><FilmReel/></div>
            <div className='w-full'>
              <p className='text-center text-white text-xl sm:text-2xl'>Loading...</p>
              <div className='w-[200px] sm:w-[350px] xl:w-[450px] pt-4'>
                <Skeleton baseColor='#eee' highlightColor='#1B74E8' height={30}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SkeletonWatch;