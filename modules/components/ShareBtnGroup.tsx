import React, { useEffect, useState } from "react";
import useCheckAuthentication from "@/hooks/useCheckAuthentication";
import { addToMyList, removeFromMyList } from "@/services/api";
import {
  ThumbUpOffAlt,
  Add,
  Remove,
  Download,
  Share,
  Celebration,
  RefreshOutlined
} from "@mui/icons-material";
import SocialShare from "@/modules/elements/SocialShare";

type dataProps = {
  data: any;
};
const ShareBtnGroup = ({ data }: dataProps) => {
  const [isListLoading, setIsListLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [isInLish, setIsInLish] = useState(data?.isInWatchList);
  const movieId = data?._id;
  const [open, setOpen] = useState(false);
  const {isLoginUser, isLoadingUserCheck} = useCheckAuthentication();
  const handleToggle = () => {
    setOpen(!open);
  };
  const toggleFavorites = async () => {
    setIsListLoading(true);
    const checkUserID = async () => {
      if (!userId) {
        const userInfo = window.localStorage.getItem("userInfo");
        if (userInfo) {
          const userInfoObj = JSON.parse(userInfo);
          if (userInfoObj.sub) {
            setUserId(userInfoObj.sub);
          }
        }
      }
    };
    await checkUserID();
    let result;
    if (isInLish) {
      result = await removeFromMyList(userId, movieId);
      if (result.status === "success") {
        setIsInLish(false);
      }
    } else {
      result = await addToMyList(userId, movieId);
      if (result.status === "success") {
        setIsInLish(true);
      }
    }
    setIsListLoading(false);
  };

  useEffect(() => {
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
  }, []);
  useEffect(() => {
    setIsInLish(data?.isInWatchList);
    setIsListLoading(false);
  }, [data]);

  return (
    <div className="bg-black pt-4 pb-8">
      <div className="px-4 container mx-auto">
        <div className="text-white/80 flex justify-center items-end overflow-y-hidden overflow-x-auto relative z-10 border border-white/30 rounded-xl">
          {isLoginUser && (
            <ShareItem
              icon={
                (isListLoading)?(
                    <RefreshOutlined
                      sx={{
                        fontSize: 28,
                        color: "#ccc",
                      }}
                      className="animate-spin"
                    />
                ):(
                  isInLish ? (
                    <Remove
                      sx={{
                        fontSize: 28,
                        color: "#ccc",
                        border: "2px solid #ddd",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <Add
                      sx={{
                        fontSize: 28,
                        color: "#ccc",
                        border: "2px solid #ddd",
                        borderRadius: "50%",
                      }}
                    />
                  )
                )
                
              }
              label="Watchlist"
              handelClick={() => {
                toggleFavorites();
              }}
            />
          )}

          {data?._id ? (
            <>
              <ShareItem
                icon={
                  <Share
                    sx={{
                      fontSize: 28,
                      color: "#ccc",
                    }}
                  />
                }
                label="Share"
                handelClick={handleToggle}
              />

              <SocialShare
                open={open}
                setOpen={setOpen}
                url={`${process.env.NEXT_PUBLIC_SSO_DOMAIN}/details/${data?._id}`}
                title={data?.title}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default ShareBtnGroup;

type ShareItemProps = {
  icon: any;
  label: string;
  handelClick: any;
};
const ShareItem = ({ icon, label, handelClick }: ShareItemProps) => {
  return (
    <button
      className="flex flex-col justify-center items-center py-2 px-4 cursor-pointer min-w-[100px]"
      onClick={() => {
        handelClick();
      }}
    >
      {icon}
      <span className="mt-2 text-xs whitespace-nowrap">{label}</span>
    </button>
  );
};
