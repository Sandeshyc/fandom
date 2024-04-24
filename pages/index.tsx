import React, { useEffect, useState } from "react";
import useMovieList from "@/hooks/useMovieList";
import Preloader from "@/modules/skeletons/Preloader";
import useIsMobile from "@/hooks/useIsMobile";
import useClientLocaion from "@/hooks/useClientLocaion";
import ErrorPopUp from "@/modules/elements/ErrorPopUp";
import getRandomNumber from "@/utils/randomNumber";

import Mapper from "@/modules/ModuleMapper";
import { getComponent } from "@/modules";

const bgImage = 'url("/images/new-bg.png")';
const randomNumber = getRandomNumber(100000, 900000);
// Main Component of Home page
const Home = () => {
  const [isReady, setIsReady] = useState(false);
  const [userId, setUserId] = useState("");
  // const [myRegion, setRegion] = useState("PH");
  const isMobile = useIsMobile();

  const {data: clientLocation, error: locationError}:any = useClientLocaion();
  const region = clientLocation?.country?.isoCode;

  const {
    data: movies = [],
    isLoading,
    error,
  } = useMovieList(
    region,
    isMobile ? "mobile" : "web",
    "home",
    userId,
    randomNumber.toString()
  );
  // console.log('Home Page: ', userId, 'isLoading: ', isLoading, 'movies: ', movies, 'error: ', error, 'isReady', isReady);

  useEffect(() => {
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
    setIsReady(true);
  }, []);

  return (
    <div
      className={cssBoxBg}
      style={styleBoxBg}>
      {(!isLoading && isReady && movies) ? (
        <Mapper
          modules={movies}
          getComponent={getComponent}
          isLoading={isLoading}
        />
      ) : (
        <Preloader/>
      )}
      {(error || locationError) ? <ErrorPopUp message={"Sorry, Something went wrong!"} errorMsg={error}/> : null}
    </div>
  );
};

export default Home;

const cssBoxBg = `bg-[#050505] text-white overflow-hidden relative bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]`;
const styleBoxBg = {
  // backgroundImage: bgImage,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% auto",
  backgroundPosition: "right " + 30 + "%",
}