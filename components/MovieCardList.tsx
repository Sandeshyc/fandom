import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { MovieInterface } from '@/types';
import RemoveListBtn from '@/components/RemoveListButton';
import Buttons from '@/modules/Identities/Buttons';
import { VolunteerActivismOutlined } from '@mui/icons-material';
import CardHeader from '@/modules/elements/CardHeader';
import { getThumbnailLandscape } from '@/utils/getData';

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
}

const MovieCardList: React.FC<MovieCardProps> = ({ data, portrait }) => {
  const router = useRouter();
  const [isRemove, setIsRemove] = React.useState(false);

  const redirectToRent = useCallback(() => router.push(`/details/${data._id}?viewPlan=true`), [router, data._id]);
  const redirectToDetails = useCallback(() => router.push(`/details/${data._id}`), [router, data._id]);
  const isRemoveHandler = (isRemove: boolean) => {
    setIsRemove(isRemove);
  }
  const thumb = getThumbnailLandscape(data);
  return (!isRemove?
    <div className='w-full lg:w-1/2 2xl:w-1/3 px-2 mb-4'>
    <div className="group bg-gray-800 relative mb-4 flex flex-wrap text-white rounded-md sm:mr-4 justify-between h-full w-full">
      <div className="w-[40%] relative bg-gray-600 rounded-md">
        {(thumb)?
          <img onClick={redirectToDetails} src={thumb} alt={data?.title || ' '} draggable={false} className="
          cursor-pointer
          object-contain
          rounded-md
          w-full
          h-full
          flex
          justify-center
          items-center
          aspect-[9/6]
          text-white/40" />
        :
          <div onClick={redirectToDetails} className="w-full h-full bg-gray-800 text-white flex justify-center items-center cursor-pointer">{data?.title}</div>
        }        
        <CardHeader header={data?.header} />
      </div>
      <div className="w-[58%] py-1">
        <p
          onClick={redirectToDetails}
          className="text-white text-base md:text-xl xl:text-2xl mb-1 cursor-pointer"
        >{data.title}</p>    
        {(data?.contentPrivider)?<p className="text-xs sm:text-sm md:text-base xl:text-lg mb-0 md:mb-1 flex items-center"><VolunteerActivismOutlined className="w-[16px] h-[16px] text-white mr-1 pl-[3px]"/>{data?.contentPrivider}</p>:null}
        <RemoveListBtn movieId={data?._id} isRemoveHandler={isRemoveHandler} />
        {data?.allowed? (
          <Buttons 
            onClick={redirectToDetails} 
            type='white'
            className="mt-2 min-w-[90px] text-sm py-1"           
            styles={{width: 'fit-content', height: '34px'}} >Play Now</Buttons>
        ) : (
          <Buttons 
            onClick={redirectToRent}
            className="mt-2 min-w-[90px] text-sm py-1"
            styles={{width: 'fit-content', height: '34px'}}>Rent</Buttons>
        )}
      </div>
    </div></div>:null
  )
}

export default MovieCardList;
