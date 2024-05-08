import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const ReelHeading = () => {
    return (
        <div className='block'>
            <p className="mb-1 lg:mb-4 w-[200px]">
                <Skeleton baseColor='#333' highlightColor='#666' className='h-[28px] lg:h-[32px]' />
            </p>
        </div>
    );
}
export default ReelHeading;