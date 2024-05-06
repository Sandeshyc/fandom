import 'react-loading-skeleton/dist/skeleton.css'
import {FilmReel} from '@/utils/CustomSVGs';
const ChannelPlayer = () => {
    return (
      <div className="h-screen w-screen bg-gradient-to-b to-black from-gray-500 flex items-center">            
        <div className="jk_jwp_full h-screen w-screen flex justify-center items-center">
          <div className='flex justify-center grow h-[150px]'>
            <div className='w-[200px] sm:w-[350px] xl:w-[450px] opacity-20 flex justify-center items-center'>
              <FilmReel/>
            </div>
          </div>
        </div>
      </div>
    );
};
export default ChannelPlayer;