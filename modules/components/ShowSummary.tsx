import React, {useState, useEffect} from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import ReadMoreDescription from '@/modules/Identities/ReadMoreDescription';
import {capFirstLetter} from '@/utils/capFirstLetter';
import WishListButton from '@/modules/Identities/WishListButton';
import { stableKeys } from '@/utils/stableKeys';
import { yearFromDate, getTimeDifference } from '@/utils/yearFromDate';
import checkAuthentication from '@/utils/checkAuth';
import SocialShare from '@/modules/elements/SocialShare';
import { ShareIcon } from '@heroicons/react/24/solid';
import Buy from '@/components/Buy';
import Title from '@/modules/Identities/Title';
import DetailsTab from '@/components/DetailsTab';

type dataProps = {
    data: any,
    module: any
}
const ShowSummary = (inputProps:dataProps) => {
    const {data} = inputProps
    const allSeasons = data?.seasons;
    const [noOfSeasons, setNoOfSeasons] = useState(0);
    const [currentSeason, setCurrentSeason] = useState({} as any);
    // console.log('Show Summary: ', data, 'allSeasons: ', allSeasons, 'currentSeason: ', currentSeason);
    const [open, setOpen] = React.useState(false);
    const [season, setSeason] = React.useState('Season 1');
    const isMobile = useIsMobile();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const postar = data?.thumbnailPortraitUrl;
    let publishYear = data?.publishSchedule;
    // get year from date
    if(publishYear){
      publishYear = yearFromDate(publishYear);
    }
    const title = data?.title;
    const description = data?.description;
    const seasons = data?.seasons;
    const handleToggle = () => {
        setOpen(!open);
    }
    const handleSeason = (e:any) => {
        setSeason(e.target.value);
        console.log('season', season);
        // set current season
        const currentSeason = allSeasons.find((season:any) => season?.name === e.target.value);
        setCurrentSeason(currentSeason);
    }
    useEffect(() => {
        if(Array.isArray(allSeasons) && allSeasons.length > 0){
            setCurrentSeason(allSeasons[allSeasons.length - 1]);
            setNoOfSeasons(allSeasons.length);
        }
        const _checkAuthentication = async () => {
            const isAuthenticated = await checkAuthentication();
            setIsAuthenticated(isAuthenticated);
        }
        _checkAuthentication();
    }, []);
    return (
      <>
      <div className='text-white z-10 relative mt-[-100px] md:mt-[-250px] bg-gradient-to-t from-black/90 from-50% to-transparent to-100%'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap items-end pb-4 lg:pb-8'>
            <div className='w-full lg:w-2/3 mb-4 lg:mb-0'>
              <div className="flex flex-wrap items-end w-full">
                <div className='w-[100px] sm:w-[120px] mr-3 bg-zinc-700 aspect-[6/9] rounded-md overflow-hidden'>
                  <img src={postar} alt={data?.title} className='w-full text-zinc-500 object-cover h-full flex justify-center items-center' />
                </div>
                <div className='grow w-[100px]'>
                  <div className=' h-full mb-2 lg:mb-3'>
                    <Title tag='h1' size='4xl'>
                      {title}: {currentSeason?.title || ''}
                    </Title>
                  </div>
                  <p className='mb-1 flex items-center flex-wrap my-2 text-white/70 text-xs'>
                      {(data?.quality)?(<span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">{data?.quality}</span>):null}
                      {(data?.contentRating)?(<span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">{data?.contentRating}</span>):null}
                      {(noOfSeasons) &&
                          <span className='mb-1'>{noOfSeasons} Seasons</span>                      
                      }
                  </p>
                </div>
              </div> 
              <div className='w-full mt-4 lg:mt-8 flex flex-wrap items-center'>
                <div 
                  className="border border-blue-600 rounded-full bg-[url(/images/arrow_drop_down_white.svg)] bg-no-repeat bg-right bg-[length:25px_20px] w-[125px] mb-2 mr-4">
                  <select 
                  defaultValue={currentSeason?.name}
                  onChange={handleSeason}
                  className="h-[36px] lg:h-[44px] w-full bg-transparent text-white/70 rounded-md px-2 sm:px-4 py-1 focus:outline-none focus:border-transparent appearance-none outline-none pr-[20px]">
                      {allSeasons?.map((season:any, index:number) => {
                          return <option key={index} value={season?.name}
                          selected={season?.name === currentSeason?.name}
                          >{season?.title}</option>
                      })} 
                  </select>
                </div>
                {(data?._id)?<>
                  {(data?.allowed)?
                      (<div className='bg-gradient-to-r from-blue-700/50 to-blue-500/50 text-white rounded-full px-2 sm:px-4 w-[160px] lg:w-[220px] text-sm flex flex-row justify-center items-center transition active:opacity-65 h-[36px] lg:h-[44px] cursor-not-allowed mb-2 mr-4'>
                      <span>Purchased</span>
                      </div>)
                  :
                      (<div className='mb-2 mr-4'><Buy 
                      movieId={data?._id} 
                      allowedPlans={data?.allowedPlans}
                      messages={data?.messages}
                      allowed={data?.allowed}
                      data={data}
                      /></div>)
                  }
                  </>:null}
                                      
                {(isAuthenticated && data?._id)&&<div className='mb-2'><WishListButton movieId={data?._id} isInWatchList={data?.isInWatchList}/></div>}
                  {(data?._id)?<>
                      <button 
                          onClick={handleToggle}
                          className="cursor-pointer group/item w-9 h-9 flex justify-center items-center transition mb-2">
                          <ShareIcon className="text-white group-hover/item:text-neutral-300 w-6" />
                      </button>
                      <SocialShare 
                          open={open}
                          setOpen={setOpen}
                          url={`${process.env.NEXT_PUBLIC_SSO_DOMAIN}/details/${data?._id}`}
                          title={data?.title}
                      />
                  </>:null}
              </div>               
            </div>
            <div className='w-full lg:w-1/3 text-sm text-white/80'>
              <div className='asFooterMenuWrap flex flex-wrap mb-2'>
                {data?.genre?.map((itemTxt:string, index:number) => 
                  <span key={stableKeys[index]} className="inline-flex items-center text-sm mr-2 last:mr-0">{capFirstLetter(itemTxt)}
                  </span>)}
                  {(publishYear)&&<span className="inline-flex items-center text-sm mr-2 last:mr-0">{publishYear}</span>}
              </div>
              <ReadMoreDescription                
                text={description}/>
            </div>
          </div>
        </div>
      </div>
      <div className='text-white z-10 relative bg-black'>
        <div className='container mx-auto px-4'>
          <DetailsTab data={currentSeason} isPackage={false} isShow={true}/>
        </div>
      </div>
      </>
    );
  
}
export default ShowSummary;
