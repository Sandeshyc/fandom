import React, { useState, useEffect } from "react";
import { Button, CloseButton, Link } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Text from "../Identities/Text";
import useIsMobile from "@/hooks/useIsMobile";

const CookieMessage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const cookieConsent = Cookies.get("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "true", {
      expires: 365,
    });
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#f1f1f1",
        padding: "16px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <CloseButton color="#454545" onClick={handleClose} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginTop: isMobile ? "16px" : "0",
        }}
      >
        <Text size="base" className={`text-[#454545] ${!isMobile && "ml-32"}`}>
          Welcome, Kapamilya! We use cookies to improve your browsing
          experience. Continuing to use this site means you agree to our use of
          cookies.
          <span style={{ whiteSpace: "nowrap", marginLeft: "8px" }}>
            <Link
              href="https://www.abs-cbn.com/privacyinternational"
              color="#1B82F2"
              textDecoration="underline"
              target="_"
            >
              Tell me more!
            </Link>
          </span>
        </Text>
        <Button
          colorScheme="teal"
          onClick={handleAccept}
          className="bg-[#1B82F2] text-white rounded-full min-w-[96px] sm:min-w-[120px] px-3 py-1 flex justify-center items-center"
          style={{ margin: "auto", marginTop: isMobile ? "16px" : "0" }}
        >
          I Agree
        </Button>
      </div>
    </div>
  );
};

export default CookieMessage;
