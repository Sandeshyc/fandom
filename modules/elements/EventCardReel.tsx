import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { round, set } from "lodash";
import Link from "next/link";
import useMoviePopupStore from "@/hooks/useMoviePopupStore";
import {
  addToMyList,
  removeFromMyList,
  removeFromWatchingLists,
} from "@/services/api";
import checkAuthentication from "@/utils/checkAuth";
import { CalendarMonthTwoTone, FiberManualRecord } from "@mui/icons-material";
import CardHeader from "@/modules/elements/CardHeader";
import CardFooter from "@/modules/elements/CardFooter";
import Text from "@/modules/Identities/Text";
import Title from "@/modules/Identities/Title";
import { MovieInterface } from "@/types";
import {
  dateToDay,
  getDateFormat,
  convertESTtoLocalTime,
} from "@/utils/yearFromDate";
import CountDownDate from "@/modules/Identities/CountDownDate";
import { getThumbnailPortrait } from "@/utils/getData";
import RentPlayButtonLink from "@/modules/elements/Purchase/RentPlayButtonLink";
import RentPlayNotice from "@/modules/elements/Purchase/RentPlayNotice";
import {
  isOnAir
} from "@/utils/dataTimeChecking";

interface MovieCardProps {
  data: MovieInterface;
  portrait?: boolean;
  gradient?: boolean;
  sliderRef?: any;
  setRemovedItem?: any;
}
const EventCardReel: React.FC<MovieCardProps> = ({
  data,
  portrait,
  gradient,
  sliderRef,
  setRemovedItem,
}) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { openModal, updateModal } = useMoviePopupStore();
  const [userId, setUserId] = useState("");
  const [isInWatchListTemp, setIsInWatchListTemp] = useState(
    data?.isInWatchList || false
  );
  const [removeRequest, setRemoveRequest] = useState(false);
  const [watchListRequest, setWatchListRequest] = useState(false);
  const [popupIsLoading, setPopupIsLoading] = useState(false);
  const [itemRemoved, setItemRemoved] = useState(false);
  let thumbURl = getThumbnailPortrait(data);
  let title = data?.title || "";
  let description = data?.description || "";
  let publishDate = data?.publishSchedule
    ? dateToDay(data?.publishSchedule)
    : "";
  // console.log('publishDate', publishDate);
  const date = new Date();
  let timeZoneOffset = date.getTimezoneOffset();
  timeZoneOffset = -(timeZoneOffset / 60);
  if (timeZoneOffset > 0) {
    timeZoneOffset = "GMT +" + timeZoneOffset;
  }else if(timeZoneOffset < 0){
    timeZoneOffset = "GMT -" + timeZoneOffset;
  }else{
    timeZoneOffset = "GMT " + timeZoneOffset;
  }



  const thumbOuterRef = useRef(null);
  const thumbOuter = thumbOuterRef.current as unknown as HTMLElement;
  const x = useRef(false);

  let dataExtend = {
    ...data,
    thumbOuter,
    sliderRef,
    isInWatchListTemp,
    setIsInWatchListTemp,
    setRemoveRequest,
    setWatchListRequest,
    popupIsLoading,
    itemRemoved,
  };

  let timer: any = 0;
  const onHoverHandler = () => {
    let unit = window.innerWidth / 100;
    const widthUnit = 30;
    let thumbW = thumbOuter?.getBoundingClientRect()?.width;
    let thumbH = thumbOuter?.getBoundingClientRect()?.height;
    let top =
      thumbOuter?.getBoundingClientRect()?.top + window.scrollY + thumbH / 2;
    let left = thumbOuter?.getBoundingClientRect()?.left + thumbW / 2;
    // console.log('thumbW', thumbW, thumbH, top, left);
    let popWidth = unit * widthUnit;
    popWidth = popWidth < 400 ? 400 : popWidth;
    const itemWidth = thumbOuter?.getBoundingClientRect()?.width;
    if(itemWidth){
      popWidth = itemWidth * 2.5;
    }
    const popWidthHalf = popWidth / 2;

    top = round(top - popWidthHalf);
    if(top < 5){
      top = 5;
    }

    left = round(left - popWidthHalf);
    left = left < 0 ? 20 : left;
    left =
      left > window.innerWidth - popWidth - 20
        ? window.innerWidth - popWidth - 40
        : left;

    dataExtend.xy = {
      x: left,
      y: round(top),
      width: popWidth,
      thumbW: thumbW > thumbH ? thumbW : thumbH,
    };
    dataExtend.handelAddMyList = handelAddMyList;
    dataExtend.handelRemoveWatchingList = handelRemoveWatchingList;

    x.current = true;
    timer = setTimeout(() => {
      // console.log('timer', timer, x.current);
      if (x.current && openModal) {
        openModal(dataExtend);
      }
    }, 400);
  };
  const handleWatchListItemFunc = () => {
    data?.handelAddMyList(!data?.isInWatchListTemp);
  };
  const onMouseLeave = () => {
    x.current = false;
    clearTimeout(timer);
  };

  const handelAddMyList = async (isInLish: boolean) => {
    // console.log("handelAddMyList", isInWatchListTemp, userId, data?._id);
    dataExtend.popupIsLoading = true;
    updateModal(dataExtend);
    let response;
    if (!isInLish) {
      response = await removeFromMyList(userId, data?._id);
    } else {
      response = await addToMyList(userId, data?._id);
    }
    console.log("response List: ", response);
    if (response.status === "success") {
      dataExtend.isInWatchListTemp = isInLish;
      setIsInWatchListTemp(isInLish);
      console.log("isInWatchListTemp: 2 ", isInWatchListTemp);
    } else {
      console.log("Error: ", response);
    }
    dataExtend.popupIsLoading = false;
    updateModal(dataExtend);
    console.log("isInWatchListTemp: 3 ", isInWatchListTemp);
  };

  const handelRemoveWatchingList = async () => {
    console.log("handelRemoveWatchingList");
    dataExtend.popupIsLoading = true;
    updateModal(dataExtend);
    let response;
    response = await removeFromWatchingLists(userId, data?._id);
    console.log("response List: ", response);
    if (response.status === "success") {
      dataExtend.isInWatchListTemp = false;
      setIsInWatchListTemp(false);
      console.log("isInWatchListTemp: 2 ", isInWatchListTemp);
      dataExtend.popupIsLoading = false;
      dataExtend.itemRemoved = true;
      setTimeout(() => {
        setRemovedItem(data?._id);
      }, 100);
    } else {
      console.log("Error: ", response);
    }
    updateModal(dataExtend);
    dataExtend.popupIsLoading = false;
  };

  const redirectToDetails = useCallback(() => {
    router.push(`/details/${data?._id}`);
  }, [router, data?._id]);
  const redirectToWatch = useCallback(() => {
    router.push(`/watch/${data?._id}`);
  }, [router, data?._id]);
  const redireactToRent = useCallback(() => {
    router.push(`/details/${data?._id}?viewPlan=true`);
  }, [router, data?._id]);

  useEffect(() => {
    const _checkAuthentication = async () => {
      const isAuthenticated = await checkAuthentication();
      setIsAuthenticated(isAuthenticated);
    };
    _checkAuthentication();
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
  }, []);
  
  return (
    <div
      className={`group sm:h-full bg-zinc-900 rounded-md relative border border-contentColor/10`}
    >
      <div className="flex flex-wrap flex-col sm:flex-row sm:h-full">
        <div
          ref={thumbOuterRef}
          onMouseEnter={onHoverHandler}
          onMouseLeave={onMouseLeave}
          className="w-full h-auto sm:w-1/3 sm:bg-zinc-700 sm:aspect-[6/9] sm:scale-105 cursor-pointer relative rounded-md overflow-hidden"
          onClick={redirectToDetails}>
          <CardHeader header={data?.header} />
          {(thumbURl)?
            <img
              src={thumbURl}
              alt={title}
              className="w-1/2 sm:w-full sm:h-full  object-cover rounded-md bg-zinc-500 mx-auto aspect-[6/9]"
            />
          :
            <p
          className={`imgPlaceholder p-2 text-sm lg:text-lg flex justify-center items-center text-center text-gray-300 cursor-pointer  shadow-xl rounded-md w-1/2 sm:w-full sm:h-full aspect-[6/9]  bg-zinc-500 mx-auto`} >
              {title}
          </p>
          }
          <div className="absolute z-30 bottom-0 right-0 w-full ">
            <CardFooter footer={data?.footer} />
          </div>
        </div>
        <div className="sm:w-2/3 p-4">
          <Title tag="h3" size="xl">
            <Link 
              href={`/details/${data?._id}`}>
              {title}
            </Link>
          </Title>
          {description && (
            <div className="mt-2 mb-4 text-white/60">
              <Text size="sm" clamp={3}>
                {description}
              </Text>
            </div>
          )}
          {data?.onAirDate && (
            <>
              <p className="text-white/90 text-sm mb-1">
                {convertESTtoLocalTime(data?.onAirDate as string)} ({timeZoneOffset})
              </p>
              {!isOnAir(data?.onAirDate) && (
                <p className="text-white/70 text-sm mb-2 flex items-center">
                  <CalendarMonthTwoTone
                    sx={{
                      fontSize: "1.2rem",
                    }}
                    className="mr-1"
                  />
                  <span>Starts in </span>
                  <span className="text-white/90">
                    {data?.onAirDate ? (
                      <CountDownDate endDate={data?.onAirDate} short={true} />
                    ) : null}
                  </span>
                </p>
              )}
            </>
          )}
          <div className="hidden lg:block">
            <div className="flex flex-row items-center gap-2 mt-2 mb-4 lg:mb-6">
              {(data?.allowed?.message === 'Coming soon!')&&(
                <RentPlayNotice data={data?.allowed} />
              )}
              {(data?._id)&&(
                  <RentPlayButtonLink
                  itemId={data?._id} 
                  size="md"
                  data={data?.allowed}
                  onAirDate={data?.onAirDate}
                  />
              )}
            </div>
            {(data?.allowed?.message !== 'Coming soon!')&&(
                <RentPlayNotice data={data?.allowed} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventCardReel;