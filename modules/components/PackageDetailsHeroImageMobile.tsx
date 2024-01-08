import React from 'react';
import {DetailsHeroBanner} from '@/modules/components/DetailsHeroImage';
import ShareBtnGroup from '@/modules/components/ShareBtnGroup';
import PackageRentButtonMobile from '@/modules/Identities/PackageRentButtonMobile';
import MovieSummary from '@/modules/components/MovieSummary';
import WarningMessage from '@/modules/Identities/WarningMessage';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
type Props = {
    data: any;
    movieListOfset: number;
    hasMovieList: boolean;
}
const PackageDetailsHeroImageMobile = ({data, movieListOfset, hasMovieList}:Props) => {
    const thumb = (data?.heroImageUrl) ? data?.heroImageUrl : (data?.thumbnailUrl) ? data?.thumbnailUrl : '';
    return (<>
        <DetailsHeroBanner thumb={thumb}/>
        <MovieSummary data={data}/>
        <div className='relative z-10 px-2'>
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
            </div> 
            <ShareBtnGroup data={data}/>
        </div>
    </>);
};
export default PackageDetailsHeroImageMobile;