import React, {useState, useEffect} from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import { yearFromDate, getTimeDifference } from '@/utils/yearFromDate';
import DetailsTab from '@/components/DetailsTab';
import ShowSummaryMobile from '@/modules/elements/ShowSummaryMobile';
import ShowSummaryDesktop from '@/modules/elements/ShowSummaryDesktop';

type dataProps = {
    data: any,
    module: any
}
const ShowSummary = (inputProps:dataProps) => {
    const {data} = inputProps
    const allSeasons = data?.seasons;
    const [currentSeason, setCurrentSeason] = useState({} as any);
    const isMobile = useIsMobile();
    let publishYear = data?.publishSchedule;
    // get year from date
    if(publishYear){
      publishYear = yearFromDate(publishYear);
    }
    useEffect(() => {
        if(Array.isArray(allSeasons) && allSeasons.length > 0){
            setCurrentSeason(allSeasons[allSeasons.length - 1]);
        }
    }, [data]);
    return (
      <>
      {(isMobile)?(
        <ShowSummaryMobile 
          data={data}
          setCurrentSeason={setCurrentSeason}
          currentSeason={currentSeason}
        />
      ):(
        <ShowSummaryDesktop 
          data={data}
          setCurrentSeason={setCurrentSeason}
          currentSeason={currentSeason}
        />
      )}
      <div className='text-white z-10 relative bg-black'>
        <div className='container mx-auto px-4'>
          <DetailsTab data={currentSeason} isPackage={false} isShow={true}/>
        </div>
      </div>
      </>
    );
  
}
export default ShowSummary;
