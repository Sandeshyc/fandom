import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFingerPrintId, setEventRecord } from "@/services/api";
import { signOut } from "@/utils/cognitoAuth";
import Title from "@/modules/Identities/Title";
import Text from "@/modules/Identities/Text";
type Props = {
  setIsLogoutPopUp: any;
};
const LogoutPopUp = ({ setIsLogoutPopUp }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [fingerPrintId, setFingerPrintId] = useState("");
  const [userId, setUserId] = useState("");
  const logoutFnc = async () => {
    setIsLoading(true);
    const provider = localStorage.getItem("provider");
    const accessToken = localStorage.getItem("accessToken");
    const eventData = {
      eventType: "Logout",
      data: {
        deviveId: fingerPrintId,
        sessionId: accessToken,
        userId: userId,
        time: new Date().toISOString(),
      },
    };
    const response = await setEventRecord(eventData);
    // console.log("response", response);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("provider");
    localStorage.removeItem("accessToken");
    signOut();
    router.push("/login");
    // setIsLoading(false);
  };
  useEffect(() => {
    const _getFingerPrintId = async () => {
      const response = await getFingerPrintId();
      if (response.status === "success") {
        setFingerPrintId(response.fingerPrintId);
      }
    };
    _getFingerPrintId();

    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-[#FFF] w-[452px] max-w-[90%] relative flex flex-col items-center justify-center text-black/80 rounded-lg p-8">
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center rounded-lg z-10 cursor-wait" />
        )}
        <Title
          tag="h3"
          size="2xl"
          className="mb-2 font-semibold text-[#11355E] mx-auto"
        >
          Logout
        </Title>
        <Text size="base">Are you sure you want to log out?</Text>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => {
              logoutFnc();
            }}
            className="w-fit min-w-[80px] bg-[#DA312C] hover:bg-[#DA312C]/90 text-white font-medium px-3 py-2 rounded-xl "
          >
            {isLoading ? "Loading..." : "Yes"}
          </button>
          <button
            onClick={() => setIsLogoutPopUp(false)}
            className="w-fit min-w-[80px] bg-[#1B82F2] hover:bg-[#1B82F2]/90 text-white font-medium px-3 py-2 rounded-xl"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
export default LogoutPopUp;
