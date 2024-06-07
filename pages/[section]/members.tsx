import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getEntitlementList } from "@/services/api";
import useIsMobile from "@/hooks/useIsMobile";
import { getAllowedItems } from "@/utils/getData";
import Preloader from "@/modules/skeletons/Preloader";
import Image from "next/image";
import ExclusiveFooter from "@/components/ExclusiveFooter";
import ExclusiveNavigation from "@/modules/components/ExclusiveNavigation";
import BtsSlider from "@/components/BtsSlider";
const exclusive = "/images/exclusive.png";
const contentId = "6641a3eba9e8e0ae2a7786b8";
const Member = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { section } = router.query;
  const [isReady, setIsReady] = useState(false);
  const [userId, setUserId] = useState("");
  const [pageDirectory, setPageDirectory] = useState("");

  useEffect(() => {
    if (pageDirectory) {
      const userInfo = window.localStorage.getItem("userInfo");
      if (userInfo) {
        const userInfoObj = JSON.parse(userInfo);
        if (userInfoObj.sub) {
          setUserId(userInfoObj.sub);
          const _getEntitlementList = async () => {
            const resEntitlement = await getEntitlementList(userInfoObj.sub);
            console.log("Response::::", resEntitlement);
            if (resEntitlement.status === "success") {
              const allowedIds = getAllowedItems(resEntitlement?.data);
              if (Array.isArray(allowedIds) && allowedIds.length > 0) {
                allowedIds.map((allowItem: any) => {
                  if (
                    allowItem?.content?.contentId === contentId &&
                    allowItem?.content?.pageDirectory === pageDirectory
                  ) {
                    setIsReady(true);
                  } else {
                    console.log("Entitlement Not found!");
                    router.push(`/` + section);
                  }
                });
              } else {
                console.log("Entitlement Not found!");
                router.push(`/` + section);
              }
            } else {
              console.log("Entitlement API found");
              router.push(`/` + section);
            }
          };
          _getEntitlementList();
        } else {
          console.log("User not found::", userInfoObj);
          router.push(`/` + section);
        }
      } else {
        console.log("User not found:", userInfo);
        router.push(`/` + section);
      }
    }
  }, [pageDirectory]);
  useEffect(() => {
    if (section) {
      setPageDirectory(section + "/members");
    }
  }, [section]);
  return (
    <>
      {isReady ? (
        <div className="relative w-full h-full min-h-screen bg-[url('/images/bini-bg.png')] bg-fixed flex flex-col items-center justify-between">
          <ExclusiveNavigation />

          <div
            className={"w-full h-full pb-8 py-0 md:py-[60px] text-[#93767A]"}
          >
            <div className="container mx-auto max-w-[1076px] flex flex-col items-center">
              <div className="relative w-full h-[233px] md:h-[607px] flex justify-center items-center bg-[url('/images/bini-greetings.png')] bg-cover bg-center">
                <div className="z-40 max-w-[516px] text-white text-center flex flex-col items-center">
                  <p className="text-[32px] md:text-[46px]  font-corsiva">
                    Thank you for joining our <br />
                    VIP membership!
                  </p>

                  <div className="mt-6 flex items-center gap-2">
                    <Image
                      src="/images/Pause.svg"
                      width={32}
                      height={32}
                      alt="pause-vid"
                    />
                    <p>Watch Video</p>
                  </div>
                </div>

                <div className="absolute z-10 w-full h-full bg-black/50"></div>
              </div>

              <div className="px-6 xl:px-0 my-8 md:my-[60px] w-full flex flex-col gap-4">
                <p className="font-corsiva text-[28px] xs:text-[32px] sm:text-[46px] text-[#324B4E]">
                  Behind the Screen Videos
                </p>

                <BtsSlider />
              </div>

              <div className="w-full p-6 sm:p-0">
                <div className="my-8 md:my-[60px] w-full flex flex-col sm:flex-row items-center gap-6 bg-white/80 rounded-lg">
                  <Image
                    src="/images/merch-coming-soon.png"
                    width={636}
                    height={358}
                    alt="bini-merch"
                  />

                  <div className="h-full px-6 sm:p-0 text-[#324B4E] flex flex-col text-center sm:text-left items-center justify-center">
                    <div className="flex flex-col gap-2">
                      <p className="text-2xl font-semibold">
                        BINI Exclusive Shop
                      </p>
                      <p
                        className="max-w-[380px] sm:text-xl "
                        style={{
                          lineHeight: "normal",
                        }}
                      >
                        A collection of exclusive merchandise that you
                        won&apos;t find anywhere else. From limited-edition
                        apparel and stylish accessories to one-of-a-kind
                        collectibles, each item is crafted to embody the vibrant
                        spirit and unique charm of BINI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-8 md:my-[60px] w-full flex flex-col gap-4 sm:gap-6 ">
                <p className="font-corsiva text-[28px] xs:text-[32px] sm:text-[46px] px-6 lg:px-0 text-[#324B4E]">
                  Exclusive Livestream
                </p>

                <iframe
                  src="https://playerv2.kapamilya.com/api/akamai/getplayer?media=https://kapamilyalive.akamaized.net/hls/live/2035536/binidaystream/master.m3u8"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className="w-full aspect-video"
                  allowFullScreen
                ></iframe>

                {/* <div className="relative w-full h-[607px] flex justify-center items-center bg-[url(/images/exclusive-livestream.png)] bg-cover bg-center">
                  <Image
                    src="/images/Pause.svg"
                    width={60}
                    height={60}
                    alt="pause-vid"
                  />
                </div> */}
              </div>

              <div className="w-full p-6 sm:p-0">
                <div className="w-full h-[340px] flex items-center justify-center bg-white/80 rounded-lg">
                  <div className="flex flex-col items-center">
                    <p className="text-[#94B0B3] text-[24px] sm:text-[32px] font-extrabold">
                      More surprises
                    </p>
                    <p className="text-[#58C9D4] text-[32px] sm:text-[46px] font-extrabold">
                      COMING SOON!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ExclusiveFooter />
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};
export default Member;
