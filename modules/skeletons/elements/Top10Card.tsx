import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SvgNumbers from '@/utils/SvgNumbers';
const Top10Card = ({number}:{
    number: number
}) => {
    return (
        <div className="group col-span relative movieCard movieCardTopBadgeWrap">
          <div className='movieCardTop movieCardTopV2'>
            <div className='number'>
              <SvgNumbers item={number as number} />
            </div>
            <div className='img relative bg-zinc-700 rounded-md overflow-hidden'>
                <Skeleton baseColor='#333' highlightColor='#666' className='h-full w-full' />
            </div>
          </div>
        </div>
    );
}
export default Top10Card;