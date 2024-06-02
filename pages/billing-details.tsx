import React, { useEffect, useState } from "react";
import { getSession } from "@/utils/cognitoAuth";
import { useRouter } from "next/router";
import Navigation from "@/modules/components/Navigation";
import Header from "@/modules/elements/Header";
import Footer from "@/components/Footer";
import BottomNavigation from "@/modules/elements/Navigation/BottomNavigation";
import PaymentHistory from "@/modules/components/PaymentHistory";
import useIsMobile from "@/hooks/useIsMobile";
import Text from "@/modules/Identities/Text";
const bgImage = 'url("/images/new-bg.png")';

const BillingDetails = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const _getSession = async () => {
      try {
        const session = await getSession();
        if (session) {
          setIsReady(true);
        } else {
          router.replace(`/login`);
        }
      } catch (error) {
        console.error("Error:", error);
        router.replace(`/login`);
      }
    };
    _getSession();
  }, []);
  return (
    <>
      <Navigation />
      <div
        className="min-h-[100vh] min-w-full text-white bg-[#FAFAFA]"
        style={{
          // backgroundImage: bgImage,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          backgroundPosition: "right " + 30 + "%",
        }}
      >
        <div className="pt-24 lg:pt-40  px-4 ">
          <div className="container mx-auto max-w-[1400px] bg-[#FFF] border border-[#C1C0C0] shadow rounded-md">
            <PaymentHistory />
          </div>
          <div className="container mx-auto max-w-[1400px]">
            <Text size="md" className="mt-4 text-white/70">
              <span className="text-white">NOTE</span>: We only show up to 6
              months of payment history.
            </Text>
          </div>
        </div>
        </div>
        <Footer/>
        </>
    );
}
export default BillingDetails;
