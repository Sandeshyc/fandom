import React, { useRef, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";
import VideoPlayerModal from "@/modules/components/VideoPlayerModal";

SwiperCore.use([Navigation, Pagination]);

const BTS_DATA = [
  {
    thumbnail: "/images/bini-bloopers.png",
    title: "Welcome Video Bloopers",
    link: "https://playerv2.kapamilya.com/api/akamai/getplayer?media=https://ktx.akamaized.net/5595b2ce-4d25-4e11-8fe4-4fabccc90c63/bini-exclusive.ism/manifest(format=mpd-time-csf)&wv=f94f8155-4a57-4266-b04f-9f8fd7861c8e&type=symmetric&ctype=groups&cvalue=6be6eb1b-da20-4666-b0cd-3fe499db0056&fp=4d62d6ee-4fd6-473c-aad1-2c5002bae422",
  },
  {
    thumbnail: "/images/bini-bts-thumbnail2.png",
    title: "TBA",
    link: "https://playerv2.kapamilya.com/api/akamai/getplayer?media=https://ktx.akamaized.net/576a9a47-cb6f-4259-9fda-892520a54db2/sheenacam.ism/manifest(format=mpd-time-csf)&wv=c1efb7a8-7b61-464e-97af-7c2539a4eec3&type=symmetric&ctype=groups&cvalue=c3a323df-d989-42fe-bbf3-8279e8c6fd60&fp=717bcd13-c17d-4d9d-97a0-b920f8ecd4ed",
  },
];

const BtsSlider = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const isMobile = useIsMobile();
  const [isEndOfSlide, setIsEndOfSlide] = useState(false);
  const [playingVid, setPlayingVid] = useState("");

  const handleSlideChange = (swiper: any) => {
    setIsEndOfSlide(swiper.isEnd);
  };

  return (
    <>
      <VideoPlayerModal playingVid={playingVid} setPlayingVid={setPlayingVid} />

      <div className="relative w-full xl:w-full mx-auto flex items-center">
        <button disabled={!isEndOfSlide} className="disabled:opacity-50">
          <FaChevronLeft
            onClick={() => swiperRef?.current?.swiper?.slidePrev()}
            className="hidden lg:block text-xl cursor-pointer text-[#324B4E] z-10 absolute -left-1 lg:-left-2 xl:-left-5 top-[35%] -translate-x-1/2"
          />
        </button>

        <Swiper
          ref={swiperRef}
          slidesPerView={"auto"}
          freeMode={isMobile}
          spaceBetween={24}
          onSlideChange={handleSlideChange}
        >
          {BTS_DATA.map((bts) => (
            <SwiperSlide
              key={bts.title}
              style={{
                width: "fit-content",
              }}
              className="flex"
            >
              <div
                className="w-[268px] sm:w-[306px] flex flex-col gap-2 mx-auto cursor-pointer"
                onClick={() => {
                  setPlayingVid(bts.link);
                }}
              >
                <div className={`relative flex items-end`}>
                  <Image
                    src={bts.thumbnail}
                    width={306}
                    height={172}
                    alt="pause-vid"
                    className="aspect-video object-cover"
                  />

                  <div className="absolute bottom-0 p-2 w-full flex items-center justify-between">
                    <Image
                      src="/images/Pause.png"
                      width={32}
                      height={32}
                      alt="pause-vid"
                    />

                    {/* <p className="text-sm text-white bg-[#1D1D1D]/50 py-1 px-[10px] rounded">
                      2:15
                    </p> */}
                  </div>
                </div>

                <p className="text-[#454545] text-xl">{bts.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button disabled={isEndOfSlide} className="disabled:opacity-50">
          <FaChevronRight
            onClick={() => swiperRef?.current?.swiper?.slideNext()}
            className="hidden lg:block text-xl cursor-pointer text-[#324B4E] z-10 absolute right-0 xs:-right-10  top-[35%] -translate-x-1/2"
          />
        </button>
      </div>
    </>
  );
};

export default BtsSlider;
