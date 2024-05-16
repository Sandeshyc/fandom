import React, {useState, useEffect} from 'react';
import { stableKeys } from '@/utils/stableKeys';
import { yearFromDate, getTimeDifference } from '@/utils/yearFromDate';
import Title from '@/modules/Identities/Title';
import RentPlayNotice from "@/modules/elements/Purchase/RentPlayNotice";
import PackageRentPlayButtonAction from "@/modules/elements/Purchase/PackageRentPlayButtonAction";
import ShareBtnGroup from '@/modules/components/ShareBtnGroup';
import {capFirstLetter} from '@/utils/capFirstLetter';
type Props = {
    data: any,
    setCurrentSeason: (currentSeason:any) => void,
    currentSeason: any
}
const ShowSummaryMobile = ({data, setCurrentSeason, currentSeason}:Props) => {
    const allSeasons = data?.seasons;
    const [noOfSeasons, setNoOfSeasons] = useState(0);
    const [season, setSeason] = React.useState('Season 1');
    const postar = data?.thumbnailPortraitUrl;
    let publishYear = data?.publishSchedule;
    // get year from date
    if(publishYear){
      publishYear = yearFromDate(publishYear);
    }
    const title = data?.title;
    const handleSeason = (e:any) => {
        setSeason(e.target.value);
        console.log('season', season);
        // set current season
        const currentSeason = allSeasons.find((season:any) => season?._id === e.target.value);
        setCurrentSeason(currentSeason);
    }
    useEffect(() => {
        if(Array.isArray(allSeasons) && allSeasons.length > 0){
            setCurrentSeason(allSeasons[allSeasons.length - 1]);
            setNoOfSeasons(allSeasons.length);
        }
    }, [data]);
    return (
      <>
      <div className='text-white z-10 relative mt-[-100px] md:mt-[-250px] bg-gradient-to-t from-black from-50% to-transparent to-100%'>
        <div className='container mx-auto px-4'>
          <div className="flex flex-wrap items-end w-full pb-4">
            <div className='w-[100px] sm:w-[120px] mr-3 bg-zinc-700 aspect-[6/9] rounded-md overflow-hidden'>                  
              {(postar)&&(
                <img src={postar} alt={data?.title} className='w-full text-zinc-500 object-cover h-full flex justify-center items-center' />
              )}
            </div>
            <div className='grow w-[100px]'>
              <div className=' h-full mb-2 lg:mb-3'>
                <Title tag='h1' size='2xl'>
                  {title}{(noOfSeasons > 1) &&
                      <>
                      : {currentSeason?.title}
                      </>                    
                  }
                </Title>
              </div>
              <p className='mb-1 flex items-center flex-wrap my-2 text-white/70 text-xs'>
                  {(data?.quality)&&(
                    <span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">{data?.quality}</span>
                  )}
                  {(data?.contentRating)&&(
                    <span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">{data?.contentRating}</span>
                  )}
                  {(noOfSeasons > 1) &&
                    <span className='mb-1'>{noOfSeasons} Seasons</span>                      
                  }
              </p>
              <div className='asFooterMenuWrap flex flex-wrap mb-2'>
                {data?.genre?.map((itemTxt:string, index:number) => 
                  <span key={stableKeys[index]} className="inline-flex items-center text-sm mr-2 last:mr-0">{capFirstLetter(itemTxt)}
                  </span>)}
                  {(publishYear)&&<span className="inline-flex items-center text-sm mr-2 last:mr-0">{publishYear}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='relative z-10'>
        <div className='container mx-auto px-4'>
            <RentPlayNotice data={currentSeason?.allowed} />
            <div className='flex flex-row items-center lg:mb-5 flex-wrap justify-between mx-[-7px]'>
              {(noOfSeasons > 1)&&(
                  <div className='w-1/2 px-[7px]'>
                    <div className="rounded-full border border-blue-600">
                      <select 
                      value={currentSeason?._id}
                      onChange={handleSeason}
                      className="h-[34px] lg:h-[40px] rounded-full bg-black/90 bg-[url(/images/arrow_drop_down_white.svg)] bg-no-repeat bg-right bg-[length:25px_20px] w-full text-white/70 px-2 sm:px-4 py-1 focus:outline-none focus:border-transparent appearance-none outline-none pr-[20px]">
                          {allSeasons?.map((season:any, index:number) => {
                              return <option key={stableKeys[index]} value={season?._id}
                              >{(season?.displayText)?season?.displayText:'Season ' + (index + 1)}</option>
                          })} 
                      </select>
                    </div>
                  </div>
                )}
                <div className={`${(noOfSeasons > 1)?'w-1/2':'w-full'} px-[7px]`}> 
                    <PackageRentPlayButtonAction 
                    data={currentSeason} 
                    allowedData={currentSeason?.allowed}
                    size="full"/>                                                     
                </div>
            </div>
        </div>
      </div>   
      <ShareBtnGroup data={currentSeason}/>        
      </>
    );
  
}
export default ShowSummaryMobile;
