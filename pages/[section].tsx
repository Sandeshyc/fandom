import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useMovieList from "@/hooks/useMovieList";
import SkeletonHome from "@/components/Skeleton/SkeletonHome";
import useIsMobile from "@/hooks/useIsMobile";
import getLocation from "@/services/api/location";
import ErrorPopUp from "@/modules/elements/ErrorPopUp";
import getRandomNumber from "@/utils/randomNumber";

import Mapper from "@/modules/ModuleMapper";
import { getComponent } from "@/modules";

const bgImage = 'url("/images/new-bg.png")';

const Section = (props: any) => {
  const router = useRouter();
  const { section } = router.query;
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
  const {
    data: movies = [],
    isLoading,
    error,
  } = useMovieList(
    myRegion,
    isMobile ? "mobile" : "web",
    section as string,
    userId,
    randomNumber.toString()
  );
  console.log('isLoading', isLoading, 'movies', movies, 'error', error, 'isReady', isReady);

  return (
    <>
      <div
        className="bg-[#000000] text-white bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]"
        style={{
          // backgroundImage: bgImage,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          backgroundPosition: "right " + 30 + "%",
        }}
      >
        {!isLoading && isReady && movies ? (
          <>
            <Mapper
              modules={movies}
              getComponent={getComponent}
              isLoading={isLoading}
            />
          </>
        ) : (
          <SkeletonHome />
        )}
        {error ? <ErrorPopUp message={"Sorry, Something went wrong!"} /> : null}
      </div>
    </>
  );
};

export default Section;