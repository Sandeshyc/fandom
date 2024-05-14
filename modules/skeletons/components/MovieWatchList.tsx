import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonListCard from '@/components/Skeleton/ListCard';
import useIsMobile from "@/hooks/useIsMobile";
import ReelHeading from "@/modules/skeletons/elements/ReelHeading";
const MovieWatchList = () => {
    const isMobile = useIsMobile();
    return (
        <div className={`px-4 max-w-[2400px] mx-auto min-h-[70vh]`}
        style={{
          marginTop: isMobile ? "70px" : "120px",
        }}>
            <div className='z-10 relative mb-[3vw]'>
                <ReelHeading />
                <div className="flex flex-wrap sm:mx-[-7px] xl:mx-[-14px]">
                    <SkeletonListCard count={6}/>
                </div>
            </div>
        </div>
    )
}
export default MovieWatchList;