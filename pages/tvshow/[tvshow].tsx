import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import useTvShowDetails from '@/hooks/useTvShowDetails';
import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';
import getLocation from '@/services/api/location';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
import SkeletonExploreAll from '@/components/Skeleton/SkeletonExploreAll';
import useIsMobile from '@/hooks/useIsMobile';
import SkeletonHeader from '@/components/Skeleton/Header';
import DetailsHeroImage from "@/modules/skeletons/components/DetailsHeroImage";
import ShowSummary from "@/modules/skeletons/components/ShowSummary";

const bgImage = 'url("/images/new-bg.png")';

const Categories = (props:any) => {  
  const [isReady, setIsReady] = React.useState(false);
  const [userId, setUserId] = React.useState('');
  const router = useRouter();
  const [myRegion, setRegion] = useState('PH');
  const isMobile = useIsMobile();
  const { tvshow } = router.query;
  const _location = async () => {
    const {countryIsoCode} = await getLocation();
    setRegion(countryIsoCode);
  }
  _location();

  const { data, isLoading, error} = useTvShowDetails(tvshow as string, userId as string, (isMobile)?'mobile':'web', myRegion);
  // console.log('data', data);

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
    setIsReady(true);
  }, []);
  return (<>
    <div
    className='bg-[#000000] text-white'
    style={{
      backgroundImage: bgImage,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: 'right '+ 30 + '%',
    }}>
    {(!isLoading && isReady && data)?<>
      <Mapper
        modules={data}
        itemCode = {tvshow as string}
        getComponent = {getComponent}
        isLoading = {isLoading}/></> : (
          <>
          <SkeletonHeader/>
          <DetailsHeroImage/>
          <ShowSummary/>
          </>
        )}
    {(error)?<ErrorPopUp message={'Sorry, Something went wrong!'} errorMsg={error}/>:null}
    </div>
    </>) 
}

export default Categories;