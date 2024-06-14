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
import ReactVideoPlayer from "@/modules/components/ReactPlayer";
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
            // console.log("Response::::", resEntitlement);
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
                    // console.log("Entitlement Not found!");
                    // router.push(`/` + section);
                    window.location.replace(`/` + section);
                  }
                });
              } else {
                // console.log("Entitlement Not found!");
                // router.push(`/` + section);
                window.location.replace(`/` + section);
              }
            } else {
              // console.log("Entitlement API found");
              // router.push(`/` + section);
              window.location.replace(`/` + section);
            }
          };
          _getEntitlementList();
        } else {
          // console.log("User not found::", userInfoObj);
          // router.push(`/` + section);
          window.location.replace(`/` + section);
        }
      } else {
        // console.log("User not found:", userInfo);
        // router.push(`/` + section);
        window.location.replace(`/` + section);
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
              <div className="w-full mx-auto aspect-video">
                <ReactVideoPlayer
                  videoURL="https://qa-static3.abs-cbn.com/bini/bini-welcome.mp4"
                  control={true}
                  play={true}
                  isMute={false}
                  poster={"/images/greetings-thumbnail.png"}
                />
              </div>

              <div className="px-6 xl:px-0 my-8 md:my-[60px] w-full flex flex-col gap-4">
                <p className="font-corsiva text-[28px] xs:text-[32px] sm:text-[46px] text-[#324B4E]">
                  Exclusive Videos
                </p>

                <BtsSlider />
              </div>

              <div className="w-full p-6 sm:p-0">
                <div className="my-8 md:my-[60px] w-full flex flex-col sm:flex-row items-center overflow-hidden bg-white/80 rounded-lg">
                  <div className="w-full max-w-[600px] h-[290px] sm:h-[452px] relative aspect-auto">
                    <Image
                      src="/images/bini-run.png"
                      fill
                      alt="bini-merch"
                      className="object-cover"
                    />
                  </div>

                  <div className="h-full p-6 text-[#454545] flex flex-col text-center sm:text-left items-center justify-center">
                    <div className="flex flex-col gap-2">
                      <p className="text-2xl text-[#324B4E] font-semibold">
                        BINI Run race kits are available for a limited time only so register now!
                      </p>

                      <div
                        className="max-w-[428px] sm:text-xl flex flex-col items-start gap-[10px]"
                        style={{
                          lineHeight: "normal",
                        }}
                      >
                        <p>
                          The first 1,000 exclusive members to redeem their race kits will have the chance to run closer with BINI during the BINI Run. 
                          Ticket buyers can claim their race kits at ABS-CBN Center Road on June 20, 21, and 22 from 1pm-8pm only. 
                          Members will have to bring their tickets and membership QR codes for verification. 
                          BINI Run gates will open at 4am at Quirino Grandstand. 
                          Enter via South Drive, Roxas Boulevard. 
                          Come ready wearing your singlets and race bibs. 
                          Please bring your tickets and exclusive membership details for confirmation. 
                          See you there! 
                        </p>

                        {/* <p>
                          As an exclusive member, you&apos;ll still have a
                          chance to grab these BINI items on ground! Kapit lang
                          and don&apos;t miss out!
                        </p>

                        <p className="font-semibold">
                          *Only the first 200 of each item will be available on
                          BINI Day. Exclusive members can only buy one of each
                          item.
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-8 md:my-[60px] w-full flex flex-col gap-4 sm:gap-6 ">
                <p className="font-corsiva text-[28px] xs:text-[32px] sm:text-[46px] px-6 lg:px-0 text-[#324B4E]">
                  Exclusive Livestream
                </p>

                <iframe
                  src="https://playerv2.kapamilya.com/api/akamai/getplayer?media=https://kapamilyalive.akamaized.net/hls/live/2035536/binidaystream/master.m3u8&poster=https://fandom-web.abs-cbn.com/images/greetings-thumbnail.png&thumbnail=https://fandom-web.abs-cbn.com/images/greetings-thumbnail.png&image=https://fandom-web.abs-cbn.com/images/greetings-thumbnail.png"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className="w-full aspect-video"
                  allowFullScreen
                ></iframe>
              </div>

              <iframe
                className="my-8 md:my-[60px] megaphone-controller-iframe min-h-[750px] xs:min-h-[710px] sm:min-h-[647px] md:min-h-[585px] w-full border-none"
                src="https://controller.megaphonetv.com/?m=0cij6&iswebpoll=true&poll_id=66642015e37f30000506e131"
                loading="lazy"
                title="MegaController"
                allow="camera *;microphone *;fullscreen *;autoplay *; clipboard-write *;"
                allowFullScreen
              ></iframe>
              <script
                src="https://embed.megaphonetv.com/embed.js"
                data-name="megaphoneembed"
                type="text/javascript"
                defer
              ></script>

              {/* <div className="my-8 md:my-[60px] w-full flex flex-col gap-4 sm:gap-6 ">
                <p className="font-corsiva text-[28px] xs:text-[32px] sm:text-[46px] px-6 lg:px-0 text-[#324B4E]">
                  Exclusive Video
                </p>

                <iframe
                  className="w-full aspect-video"
                  src="https://playerv2.kapamilya.com/api/akamai/getplayer?media=https://ktx.akamaized.net/5595b2ce-4d25-4e11-8fe4-4fabccc90c63/bini-exclusive.ism/manifest(format=mpd-time-csf)&wv=f94f8155-4a57-4266-b04f-9f8fd7861c8e&type=symmetric&ctype=groups&cvalue=6be6eb1b-da20-4666-b0cd-3fe499db0056&fp=4d62d6ee-4fd6-473c-aad1-2c5002bae422"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div> */}

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
