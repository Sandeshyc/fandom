import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const RollBorderedCard = () => {
    return (
      <div className={`bg-[#101010]/60 group overflow-hidden col-span relative border-blue-700 border p-[1.8vw] rounded-xl w-full transition-all duration-500 hover:border-white`}>
      <div className={`img relative h-full w-full bg-zinc-900 rounded-md overflow-hidden`}>
        <Skeleton baseColor='#333' highlightColor='#666' className='h-full w-full rounded-lg z-10 aspect-[6/9]' />
      </div>
    </div>
    );
}
export default RollBorderedCard;