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
        if(tab){
            setCurrentTab(tab);
            setCurrentTabData(tabItems);
        }else{
            setCurrentTab('');
            if(Array.isArray(offerLists) && offerLists?.length > 0){
                let allItems = [] as any;
                offerLists.map((item) => {
                    allItems = [...allItems, ...item.items];
                });
                setCurrentTabData(allItems);
            }else{
                setCurrentTabData([]);
            }
        }
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
            // setCurrentTab(offerLists[0]?.promoId);
            // setCurrentTabData(offerLists[0]?.items);
            setCurrentTab('');
            if(Array.isArray(offerLists) && offerLists?.length > 0){
                let allItems = [] as any;
                offerLists.map((item) => {
                    allItems = [...allItems, ...item.items];
                });
                setCurrentTabData(allItems);
            }else{
                setCurrentTabData([]);            
            }
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
                        <li
                            className={`text-xs lg:text-sm border lg:border-2 mb-2 flex justify-center items-center ${
                                (!currentTab) ? "border-white bg-blue-500" : "border-gray-500"
                            } rounded-full h-[34px] lg:h-[40px] py-1 px-2 lg:py-2 lg:px-4 mr-2 md:mr-2 lg:mr-4 min-w-[60px] lg:min-w-[160px] cursor-pointer hover:border-white/80`}
                            onClick={() => handlePromoTab('', [])}>
                            All
                        </li>
                        {offerLists.map((item: any, index: number) => (
                            <li
                            className={`text-xs lg:text-sm border lg:border-2 mb-2 flex justify-center items-center ${
                                (item?.promoId === currentTab) ? "border-white bg-blue-500" : "border-gray-500"
                            } rounded-full h-[34px] lg:h-[40px] py-1 px-2 lg:py-2 lg:px-4 mr-2 md:mr-2 lg:mr-4 min-w-[60px] lg:min-w-[160px] cursor-pointer hover:border-white/80`}
                            key={index}
                            onClick={() => handlePromoTab(item?.promoId, item?.items)}>
                            {item.title}
                        </li>
                        ))}                        
                    </ul>
                )}
                <div className='flex lg:hidden flex-wrap mx-[-10px]'>
                    {currentTabData?.map((movie, index) => (
                        <MovieCardReelPortraitMultiRaw key={stableKeys[index]} data={movie} portrait={isMobile || true} gradient={false} setRemovedItem={setRemovedItem}/>
                    ))}
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