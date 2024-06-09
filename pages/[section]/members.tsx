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
                    // router.push(`/` + section);
                    window.location.replace(`/` + section);
                  }
                });
              } else {
                console.log("Entitlement Not found!");
                // router.push(`/` + section);
                window.location.replace(`/` + section);
              }
            } else {
              console.log("Entitlement API found");
              // router.push(`/` + section);
              window.location.replace(`/` + section);
            }
          };
          _getEntitlementList();
        } else {
          console.log("User not found::", userInfoObj);
          // router.push(`/` + section);
          window.location.replace(`/` + section);
        }
      } else {
        console.log("User not found:", userInfo);
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
              {/* <div className="w-full mx-auto max-w-[1067] aspect-video">
                <ReactVideoPlayer
                  videoURL="https://live-par-2-abr.livepush.io/vod/bigbuckbunnyclip.mp4"
                  control={true}
                  play={true}
                  isMute={false}
                  poster={'https://billboardphilippines.com/wp-content/uploads/2024/06/bini-FTR-IMG-1600x838.jpg'}
                />
              </div> */}
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

              {/* <div className="px-6 xl:px-0 my-8 md:my-[60px] w-full flex flex-col gap-4">
                <p className="font-corsiva text-[28px] xs:text-[32px] sm:text-[46px] text-[#324B4E]">
                  Behind the Screen Videos
                </p>

                <BtsSlider />
              </div> */}

              <div className="w-full p-6 sm:p-0">
                <div className="my-8 md:my-[60px] w-full flex flex-col sm:flex-row items-center overflow-hidden bg-white/80 rounded-lg">
                  <div className="w-full max-w-[600px] h-[290px] sm:h-[452px] relative aspect-auto">
                    <Image
                      src="/images/bini-merch.jpg"
                      fill
                      alt="bini-merch"
                      className="object-cover"
                    />
                  </div>

                  <div className="h-full p-6 text-[#454545] flex flex-col text-center sm:text-left items-center justify-center">
                    <div className="flex flex-col gap-2">
                      <p className="text-2xl text-[#324B4E] font-semibold">
                        Save the date on June 11!
                      </p>

                      <div
                        className="max-w-[428px] sm:text-xl flex flex-col items-start gap-[10px]"
                        style={{
                          lineHeight: "normal",
                        }}
                      >
                        <p>
                          We&apos;re releasing three exclusive items from the
                          first wave of BINI Merch on BINI Day: the
                          limited-edition Official BINI Shirt, BINI Iron-on
                          Patches, and BINI Holographic Stickers. Just present
                          the QR code from your confirmation email as proof that
                          you are an exclusive member.If you didn&apos;t get to
                          register for BINI Day, don&apos;t worry!
                        </p>

                        <p>
                          As an exclusive member, you&apos;ll still have a
                          chance to grab these BINI items on ground! Kapit lang
                          and don&apos;t miss out!
                        </p>

                        <p className="font-semibold">
                          *Only the first 200 of each item will be available on
                          BINI Day. Exclusive members can only buy one of each
                          item.
                        </p>
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

              <iframe
                className="my-8 md:my-[60px] megaphone-controller-iframe min-h-[480px] max-h-none min-w-[340px] w-full border-none"
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
