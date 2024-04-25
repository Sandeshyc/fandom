import React, {useEffect, useState} from 'react';
import {DetailsHeroBanner} from '@/modules/components/DetailsHeroImage';
import ShareBtnGroup from '@/modules/components/ShareBtnGroup';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
import { getThumbnailLandscape } from '@/utils/getData';
import RentPlayNotice from '@/modules/elements/Purchase/RentPlayNotice';
import PackageRentPlayButtonAction from "@/modules/elements/Purchase/PackageRentPlayButtonAction";
import {
    usePackageMovielist
} from '@/stores/UserStore';

type Props = {
    data: any;
}
const PackageDetailsHeroImageMobile = ({data}:Props) => {
    const thumb = getThumbnailLandscape(data);
    const hasMovieList = usePackageMovielist((state) => state.hasMovieList);
    const movieListOfset = usePackageMovielist((state) => state.movieListOfset);
    return (<>
        <DetailsHeroBanner thumb={thumb}/>
        <div className="text-white max-w-[1600px] mx-auto px-[15px] z-10 relative my-4">
            <h1 className="text-2xl md:text-4xl h-full lg:text-5xl mb-2 lg:mb-3">{(data?.title)?data.title:''}</h1>
            {(data?.packageShortDetails) ? (<p className="mb-1 flex items-center flex-wrap my-2">
                <span className="text-gray-300 mr-2 text-xl">{data?.packageShortDetails}</span>
            </p>):
            null}
        </div> 
        <div className='relative z-10 p-2'>
            <RentPlayNotice data={data?.allowed} />
            {(data?._id)?
            <div className='flex flex-wrap justify-between mx-[-7px]'>
                <div className='w-1/2 px-[7px]'> 
                    <PackageRentPlayButtonAction 
                    data={data} 
                    allowedData={data?.allowed}
                    size="full"/>                                                     
                </div>
                <div className='w-1/2 px-[7px]'>
                {(hasMovieList)&&(
                    <button 
                        onClick={() => {
                            if(movieListOfset){
                                window.scrollTo({top: movieListOfset-60, behavior: 'smooth'});
                            }                
                        }} 
                        className="text-white py-1 text-base flex flex-row items-center justify-center transition h-[34px] lg:h-[40px] border border-white/40 rounded-full hover:border-white/80 w-full">
                            Movie List <ChevronRightIcon className="w-5 h-5 ml-2 text-white/80" />
                    </button>
                )}
                </div>
            </div>:
            <ErrorPopUp
            message='Sorry, Something went wrong!'
            isRetry={false}
            />}
        </div>
        <ShareBtnGroup data={data}/>
    </>);
};
export default PackageDetailsHeroImageMobile;