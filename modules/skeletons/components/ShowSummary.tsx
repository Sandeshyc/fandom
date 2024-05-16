import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Episodes from '@/modules/skeletons/elements/Episodes';
import ShowSummaryDesktop from '@/modules/skeletons/elements/ShowSummaryDesktop';
import ShowSummaryMobile from '@/modules/skeletons/elements/ShowSummaryMobile';
import useIsMobile from '@/hooks/useIsMobile';
const ShowSummary = () => {
    const isMobile = useIsMobile();
    return (
        <>
        {isMobile ? <ShowSummaryMobile/> : <ShowSummaryDesktop/>}
        <Episodes/>
        </>
    );
};
export default ShowSummary;