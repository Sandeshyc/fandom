import React, { useEffect, useState } from 'react';
import Title from '@/modules/Identities/Title';
import {capFirstLetter} from '@/utils/capFirstLetter';
import { stableKeys } from '@/utils/stableKeys';
import { getThumbnailPortrait } from '@/utils/getData';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';

import WishListButton from '@/modules/Identities/WishListButton';
import { ShareIcon } from '@heroicons/react/24/solid';
import SocialShare from '@/modules/elements/SocialShare';
import PackageRentPlayButtonAction from '@/modules/elements/Purchase/PackageRentPlayButtonAction';
import RentPlayNotice from '@/modules/elements/Purchase/RentPlayNotice';

const ChannelDetails = (inputProps:any) => {
    const {data} = inputProps;
    const isLoginUser = useCheckAuthentication();
    const postar = getThumbnailPortrait(data);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    }
    return (<>
      <div className='text-white z-10 relative bg-gradient-to-t from-black/90 from-30% to-transparent to-75% mt-12'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap items-end pb-4 lg:pb-8'>
            <div className='w-full lg:w-2/3 mb-4 lg:mb-0'>
              <div className="flex flex-wrap items-end w-full">
                <div className='w-[100px] sm:w-[120px] mr-3 bg-zinc-700 aspect-[6/9] rounded-md overflow-hidden'>
                  <img src={postar} alt={data?.title} className='w-full text-zinc-500 object-cover h-full flex justify-center items-center' />
                </div>
                <div className='grow w-[100px]'>
                  <div className='block lg:hidden h-full mb-2 lg:mb-3'>
                    <Title tag='h1' size='xl'>{data?.title}</Title>
                  </div>
                  <div className='hidden lg:block h-full mb-2 lg:mb-3'>
                    <Title tag='h1' size='4xl'>{data?.title}</Title>
                  </div>
                  <p className='mb-1 flex items-center flex-wrap my-2 text-white/70 text-xs'>
                    {(data?.quality)?(<span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">{data?.quality}</span>):null}
                    {(data?.contentRating)?(<span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">{data?.contentRating}</span>):null}
                  </p>
                  {(Array.isArray(data?.genre) && data?.genre?.length > 0)&&
                    <div className='popUpGenre flex flex-wrap items-center text-contentColor/70'>
                      {data?.genre?.map((itemTxt:string, index:number) => 
                      <span key={stableKeys[index]} className="inline-flex items-center text-sm mr-2 last:mr-0">{capFirstLetter(itemTxt)}
                      </span>)}
                    </div>}
                </div>
              </div>                
            </div>
          </div>
        </div>
      </div>
      <div className='text-white z-10 relative bg-gradient-to-t from-black from-50% to-black/90 to-100% pb-8'>
            <div className='container mx-auto px-4'>
                <RentPlayNotice data={data?.allowed} />
                <div className='w-full flex flex-wrap items-center'>      
                    <div className='mr-4'>
                        <PackageRentPlayButtonAction
                            data={data}
                            allowedData={data?.allowed}
                            size='lg'
                        />                                                       
                    </div>
                                          
                    {(isLoginUser)&&<WishListButton movieId={data?._id} isInWatchList={data?.isInWatchList}/>}
                    <button 
                        onClick={handleToggle}
                        className="cursor-pointer group/item w-9 h-9 flex justify-center items-center transition">
                        <ShareIcon className="text-white group-hover/item:text-neutral-300 w-6" />
                    </button>
                    <SocialShare 
                        open={open}
                        setOpen={setOpen}
                        url={`${process.env.NEXT_PUBLIC_SSO_DOMAIN}/details/${data?._id}`}
                        title={data?.title}
                    />
                </div>
                <div>
                    <p className='text-white/80 mt-4'>{data?.description}</p>
                </div>
            </div>
        </div>
      </>
    );
}
export default ChannelDetails;