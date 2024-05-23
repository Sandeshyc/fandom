import 'react-loading-skeleton/dist/skeleton.css'
import {FilmReel} from '@/utils/CustomSVGs';
const ChannelPlayer = () => {
    return (
      <div className="aspect-[16/9] lg:h-screen w-screen bg-gradient-to-b to-black from-gray-500 flex items-center justify-center">            
        <div className='w-[45%] h-[45%] max-w-[450px] opacity-40'>
          <FilmReel/>
        </div>
      </div>
    );
};
export default ChannelPlayer;