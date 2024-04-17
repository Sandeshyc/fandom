import 'react-loading-skeleton/dist/skeleton.css'
import {FilmReel} from '@/utils/CustomSVGs';
const DetailsHeroImage = () => {
    return (
        <>
      <div className="block">
        <div className="movieSliderInner mb-[-100px] md:mb-[-180px]">
          <div className="w-full p-4 flex flex-wrap flex-col justify-between bg-gradient-to-b to-black from-gray-500 h-[350px] md:h-[75vh] max-h-[100%] min-h-[400px] md:min-h-[700px]">
            <div className='flex justify-center grow h-[150px]'>
              <div className='w-[200px] sm:w-[350px] xl:w-[450px] opacity-20 flex justify-center items-center'>
                <FilmReel/>
              </div>
            </div>
          </div>
        </div>        
      </div>
    </>
    );
};
export default DetailsHeroImage;