import React, {useEffect} from 'react';
import FavoriteButton from '@/components/FavoriteButton';
import PackageRentButton from '@/modules/Identities/PackageRentButton';
import { ThumbUp } from '@mui/icons-material';
import { ShareIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { yearFromDate } from '@/utils/yearFromDate';
import WarningMessage from '@/modules/Identities/WarningMessage';
import {DetailsHeroBanner} from '@/modules/components/DetailsHeroImage';
import PackageDetailsHeroImageMobile from '@/modules/components/PackageDetailsHeroImageMobile';
import useIsMobile from '@/hooks/useIsMobile';
import SocialShare from '@/modules/elements/SocialShare';
type Props = {
    data: any;
}
const PackageDetailsHeroImage = ({data}:Props) => {
    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
        setOpen(!open);
    }
    const [hasMovieList, setHasMovieList] = React.useState(false);
    const [movieListOfset, setMovieListOfset] = React.useState(0);
    const movieId = data?._id || '';
    let thumb = (data?.heroImageUrl) ? data?.heroImageUrl : (data?.thumbnailUrl) ? data?.thumbnailUrl : '';
    const isMobile = useIsMobile();

    useEffect(() => {
        const movieListHeroBanner = document.querySelector('.movieListHeroBanner');
        if((movieListHeroBanner !== null) && (movieListHeroBanner !== undefined) && (movieListHeroBanner !== '')){
            setHasMovieList(true);
            setMovieListOfset((movieListHeroBanner?.getBoundingClientRect()?.top || 0) + window.scrollY);
        }
    }, []);
    // console.log('PackageDetailsHeroBanner', movieListOfset, hasMovieList);
    return (<>
        {(isMobile)?(<PackageDetailsHeroImageMobile data={data}/>):
        <>
        <DetailsHeroBanner thumb={thumb}/>
        <div className="text-white max-w-[1600px] mx-auto px-[15px] z-10 relative my-4">
            <h1 className="text-2xl md:text-4xl h-full lg:text-5xl mb-2 lg:mb-3">{(data?.title)?data.title:'Upcomming...'}</h1>
            {(data?.packageShortDetails) ? (<p className="mb-1 flex items-center flex-wrap my-2">
                <span className="text-gray-300 mr-2 text-xl">{data?.packageShortDetails}</span>
            </p>):
            null}
            <div className="flex flex-row items-center mb-1">
                {(data?.publishSchedule)?
                (<p className="text-gray-300 mr-4">{yearFromDate(data?.publishSchedule)}</p>):
                null}
                {(data?.quality)?(<p className="border-gray-500 border px-1 mr-1 text-xs">{data?.quality}</p>):null}
                {(data?.contentRating)?(<p className="border-gray-500 border px-1 mr-1 text-xs">{data?.contentRating}</p>):null}
            </div>      
            {(data?.contentProvider)?(<p className="mb-1"><span className="text-gray-300">Content Provider:</span> {data?.contentProvider}</p>):null}
        </div>  
        <div className="text-white max-w-[1600px] mx-auto px-[15px] z-10 relative my-4">
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
            <div className="flex flex-row gap-4 items-center lg:mb-5 flex-wrap"> 
                {(data?.canBuy === true)?(<PackageRentButton 
                data={data}/>):
                (<button className={`cursor-not-allowed opacity-60 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full py-1 px-3 w-[180px] text-base  h-[44px]`}>Rent</button>)}
                {(hasMovieList)?<>
                    <button 
                        onClick={() => {
                            if(hasMovieList){
                                window.scrollTo({top: movieListOfset - 100, behavior: 'smooth'});
                            }                
                        }} 
                        className="text-white py-1 text-base flex flex-row items-center justify-center transition min-w-[160px] h-[44px] border border-transparent rounded-full hover:border-white/40">
                            Movie List <ChevronRightIcon className="w-5 h-5 ml-2 text-white/80" />
                    </button>
                    </>:null}
                <div className='flex flex-row gap-8 items-center mb-0 flex-wrap'>
                    <FavoriteButton movieId={movieId} isInWatchList={data?.isInWatchList}/>
                    {(data?._id)?<>
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
                    </>:null}
                </div>
            </div>
        </div>
        </>}
    </>);
}
export default PackageDetailsHeroImage;