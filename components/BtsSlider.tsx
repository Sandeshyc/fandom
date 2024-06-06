import React, { useRef } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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

SwiperCore.use([Navigation, Pagination]);

const BTS_DATA = [
  {
    thumbnail: "/images/bini-bts-thumbnail1.png",
    title: "BINI: BINI Reacts to “Salamin, Salamin” Music Video",
    link: "#",
  },
  {
    thumbnail: "/images/bini-bts-thumbnail2.png",
    title: "BINI reacts to Born To Win music video",
    link: "#",
  },
  {
    thumbnail: "/images/bini-bts-thumbnail3.png",
    title: "BINI behind the scenes of Pantropiko Music Video",
    link: "#",
  },
  {
    thumbnail: "/images/bini-bts-thumbnail4.png",
    title: "BINI plays 'Bawal Tumawa' Challenge",
    link: "#",
  },
];

const BtsSlider = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const isMobile = useIsMobile();

  return (
    <div className="relative w-full xl:w-full mx-auto flex items-center gap-4">
      <FaChevronLeft
        onClick={() => swiperRef?.current?.swiper?.slidePrev()}
        className="hidden lg:block text-xl cursor-pointer text-[#324B4E] z-10 absolute -left-1 lg:-left-2 xl:-left-5 top-[35%] -translate-x-1/2"
      />

      <Swiper
        ref={swiperRef}
        slidesPerView={"auto"}
        freeMode={isMobile}
        spaceBetween={24}
      >
        {BTS_DATA.map((bts) => (
          <SwiperSlide key={bts.title} className="bts-video-slide flex">
            <div className="w-[268px] sm:w-[306px] flex flex-col gap-2 mx-auto">
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

                  <p className="text-sm text-white bg-[#1D1D1D]/50 py-1 px-[10px] rounded">
                    2:15
                  </p>
                </div>
              </div>

              <p className="text-[#454545] text-xl">{bts.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <FaChevronRight
        onClick={() => swiperRef?.current?.swiper?.slideNext()}
        className="hidden lg:block text-xl cursor-pointer text-[#324B4E] z-10 absolute right-0 xs:-right-10  top-[35%] -translate-x-1/2"
      />
    </div>
  );
};

export default BtsSlider;
