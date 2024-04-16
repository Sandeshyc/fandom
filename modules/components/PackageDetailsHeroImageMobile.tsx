import React, {useEffect, useState} from 'react';
import {DetailsHeroBanner} from '@/modules/components/DetailsHeroImage';
import ShareBtnGroup from '@/modules/components/ShareBtnGroup';
import PackageRentButtonMobile from '@/modules/Identities/PackageRentButtonMobile';
import MovieSummary from '@/modules/components/MovieSummary';
import WarningMessage from '@/modules/Identities/WarningMessage';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
import { getThumbnailLandscape } from '@/utils/getData';

type Props = {
    data: any;
}
const PackageDetailsHeroImageMobile = ({data}:Props) => {
    const [hasMovieList, setHasMovieList] = useState(false);
    const [movieListOfset, setMovieListOfset] = useState(0);
    const thumb = getThumbnailLandscape(data);;
    useEffect(() => {
        const movieListHeroBanner = document.querySelector('.movieListHeroBanner');
        if((movieListHeroBanner !== null) && (movieListHeroBanner !== undefined) && (movieListHeroBanner !== '')){
            setHasMovieList(true);
            setMovieListOfset((movieListHeroBanner?.getBoundingClientRect()?.top || 0) + window.scrollY);
        }
    }, []);
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
            {(data?.canBuy !== true)?(<WarningMessage 
                message={`This content is not allowed in your region`}
                iconColor={'#EAB307'}
                textColor={'#fff'}
            />):
            (data?.noOfNotAllowed > 0)?(<WarningMessage 
                message={`${data?.noOfNotAllowed} out of ${data?.noOfMovie} not allowed in your region`}
                iconColor={'#EAB307'}
                textColor={'#fff'}
            />):
            null}
            {(data?._id)?
            <div className='flex flex-wrap justify-between'>
                {(data?.canBuy === true)?(<PackageRentButtonMobile data={data} hasMovieList={hasMovieList}/>):
                    (<button className={`cursor-not-allowed opacity-60 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full py-1 px-3 w-${(hasMovieList)?'[50%]':'full'} text-base h-[44px]`}>Rent</button>)}
                {(hasMovieList)?<>
                <button 
                    onClick={() => {
                        if(hasMovieList){
                            window.scrollTo({top: movieListOfset-60, behavior: 'smooth'});
                        }                
                    }} 
                    className="text-white py-1 text-base flex flex-row items-center justify-center transition w-[48%] h-[44px] border border-white/40 rounded-full hover:border-white/80">
                        Movie List <ChevronRightIcon className="w-5 h-5 ml-2 text-white/80" />
                </button>
                </>:null}
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