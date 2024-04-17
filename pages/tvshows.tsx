import React, { useEffect, useState } from "react";
import useTvShows from "@/hooks/useTvShows";
import SkeletonHeader from "@/components/Skeleton/Header";
import SkeletonExploreAll from "@/components/Skeleton/SkeletonExploreAll";
import useIsMobile from "@/hooks/useIsMobile";
import getLocation from "@/services/api/location";
import ErrorPopUp from "@/modules/elements/ErrorPopUp";
import getRandomNumber from "@/utils/randomNumber";

import Mapper from "@/modules/ModuleMapper";
import { getComponent } from "@/modules";

const bgImage = 'url("/images/new-bg.png")';
// Main Component of Home page
const Home = () => {
  const [isReady, setIsReady] = useState(false);
  const [userId, setUserId] = useState("");
  const [myRegion, setRegion] = useState("PH");
  const randomNumber = useState(getRandomNumber(100000, 900000));
  const isMobile = useIsMobile();

  const _location = async () => {
    const { countryIsoCode } = await getLocation();
    setRegion(countryIsoCode);
  };
  _location();

  const {
    data: movies = [],
    isLoading,
    error,
  } = useTvShows(
    myRegion,
    isMobile ? "mobile" : "web",
    "tvshows",
    userId,
    randomNumber.toString()
  );
  console.log('Tv show Page: ', userId, 'isLoading: ', isLoading, 'movies: ', movies, 'error: ', error, 'isReady', isReady);

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
      className="bg-[#000000] text-white overflow-hidden relative bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]"
      style={{
        // backgroundImage: bgImage,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
        backgroundPosition: "right " + 30 + "%",
      }}>
      {(!isLoading && isReady && movies) ? (
        <Mapper
          modules={movies}
          getComponent={getComponent}
          isLoading={isLoading}
        />
      ) : (
        <>
        <SkeletonHeader/>
        <SkeletonExploreAll/>
        </>
      )}
      {error ? <ErrorPopUp message={"Sorry, Something went wrong!"} errorMsg={error}/> : null}
    </div>
  );
};

export default Home;