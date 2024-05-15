import React, { useRef, useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import queryMap from "@/modules/queries";
import Navigation from "@/modules/components/Navigation";
import Header from '@/modules/elements/Header';
import Footer from '@/components/Footer';
import BottomNavigation from '@/modules/elements/Navigation/BottomNavigation';
import ReelHeading from '@/modules/elements/ReelHeading';
import useIsMobile from '@/hooks/useIsMobile';
import useClientLocaion from "@/hooks/useClientLocaion";
import EventCardReelMutliRaw from '@/modules/elements/EventCardReelMutliRaw';
import MovieCardReelPortraitMultiRaw from '@/modules/elements/MovieCardReelPortraitMultiRaw';
import { stableKeys } from '@/utils/stableKeys';
import OffersList from '@/modules/skeletons/components/OffersList';
const Offers = () => {
    const [userId, setUserId] = useState("");
    const isMobile = useIsMobile();
    const [currentTab, setCurrentTab] = useState('');
    const [currentTabData, setCurrentTabData] = useState([]);
    const sliderRef = useRef(null);
    const [removedItem, setRemovedItem] = React.useState(null);
    const { data: clientLocation, error: locationError }: any =
    useClientLocaion();
    const region = clientLocation?.country?.isoCode;
    const data = {
        countryCode: region,
        userId: userId
    };
    const {
        loading,
        error,
        data: gqData,
    } = useQuery(queryMap["offers"], { variables: { input: data } });
    console.log(
        "userData:",
        data,
        "gqData: ",
        gqData,
        "loading: ",
        loading,
        "error: ",
        error
    );
    const offerLists = gqData?.offers;
    const handlePromoTab = (tab: string, tabItems:any) => {
        setCurrentTab(tab);
        setCurrentTabData(tabItems);
    }
    useEffect(() => {
        const userInfo = window.localStorage.getItem("userInfo");
        if (userInfo) {
          const userInfoObj = JSON.parse(userInfo);
          if (userInfoObj.sub) {
            setUserId(userInfoObj.sub);
          }
        }
    }, []);
    useEffect(() => {
        if(Array.isArray(offerLists) && offerLists?.length > 0){
            setCurrentTab(offerLists[0]?.promoId);
            setCurrentTabData(offerLists[0]?.items);
        }
    }, [offerLists]);
    return (
        <div className={cssBoxBg}
            style={styleBoxBg}>
        {isMobile?<Header/>:<Navigation/>}
        {(!loading) ? (
            <div className={`px-4 max-w-[2400px] mx-auto min-h-[70vh] z-10 relative text-white`}
                style={{
                    marginTop: isMobile ? "70px" : "120px",
                }}>
                <ReelHeading title="Deals and Offers" />
                {(Array.isArray(offerLists) && offerLists?.length > 0) && (
                    <ul className="text-white flex flex-wrap text-center mt-0 mb-4 lg:mb-8 w-full text-sm lg:text-base">
                        {offerLists.map((item: any, index: number) => (
                            <li
                                className={`text-xs lg:text-sm border lg:border-2 mb-2 flex justify-center items-center ${
                                    (item?.promoId === currentTab) ? "border-white bg-blue-500" : "border-gray-500"
                                } rounded-full h-[34px] lg:h-[40px] py-1 px-2 lg:py-2 lg:px-4 mr-2 md:mr-2 lg:mr-4 min-w-[60px] lg:min-w-[160px] cursor-pointer hover:border-white/80`}
                                key={index}
                                onClick={() => handlePromoTab(item?.promoId, item?.items)}
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="block lg:hidden">
                    <div className='flex lg:flex flex-wrap mx-[-10px]'>
                    {currentTabData?.map((movie, index) => (
                        <MovieCardReelPortraitMultiRaw key={stableKeys[index]} data={movie} portrait={isMobile || true} gradient={false} setRemovedItem={setRemovedItem}/>
                    ))}
                    </div>
                </div>
                <div className="hidden lg:flex flex-wrap mx-[-7px] lg:mx-[-15px]">
                    {currentTabData?.map((movie, index) => (
                        <EventCardReelMutliRaw key={stableKeys[index]} data={movie} portrait={false} gradient={false} sliderRef={sliderRef} setRemovedItem={setRemovedItem}/>
                    ))}
                </div> 
            </div>
        ) : (<OffersList/>)}
        {isMobile?<BottomNavigation/>:<Footer/>}
        </div>
    );
}
export default Offers;
const cssBoxBg = `bg-[#050505] text-white overflow-hidden relative bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]`;
const styleBoxBg = {
  // backgroundImage: bgImage,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% auto",
  backgroundPosition: "right " + 30 + "%",
}

export const SampleCard = ({i}:{i:number}) => {
    const randomImages = [
        'https://st2.depositphotos.com/3591429/11817/i/450/depositphotos_118171144-stock-photo-drawing-icons-with-text.jpg',
        'https://amc-theatres-res.cloudinary.com/image/upload/v1704493820/amc-cdn/general/discount-matinees/mkt_2616_2024__discount_matinee_4pm-25_percent_web_promo_1250x892_v02.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT5tQzJ_FHUJLLeNN7XO5xWRU19ByQDKKxIfLlOZeX0ZPA3_QPsBjpkJziDHUOrjVuat4&usqp=CAU',
        'https://m.media-amazon.com/images/I/51G0YY3oSYL._AC_UF894,1000_QL80_.jpg',
        'https://images.pond5.com/cinema-sign-street-entrance-movie-footage-237821891_iconl.jpeg',
        'https://img.freepik.com/premium-vector/two-cinema-tickets-vector-flat-design_159144-288.jpg',
        'https://amc-theatres-res.cloudinary.com/image/upload/v1704493820/amc-cdn/general/discount-matinees/mkt_2616_2024__discount_matinee_4pm-25_percent_web_promo_1250x892_v02.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT5tQzJ_FHUJLLeNN7XO5xWRU19ByQDKKxIfLlOZeX0ZPA3_QPsBjpkJziDHUOrjVuat4&usqp=CAU',
        'https://m.media-amazon.com/images/I/51G0YY3oSYL._AC_UF894,1000_QL80_.jpg',
    ]
    return (
    <div 
    className={`group bg-zinc-900 rounded-md col-span relative movieCard cursor-pointer aspect-[16/9]`} >
      <div className='img relative h-full w-full rounded-md overflow-hidden'>   
        <p className={`text-center min-w-[100px] text-[11px] lg:text-xs py-1 px-2 lg:px-4 w-auto absolute top-0 right-0 z-20 rounded-bl-xl rounded-tr-md shadow-lg bg-gradient-to-l from-orange-700 to-orange-500 text-white/90`}>50% off</p>
        <img src={randomImages[i]} className='w-full h-full bg-red-500 !object-cover' alt="Test" />
      </div>
    </div>
    );
}