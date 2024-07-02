import React, { useEffect } from "react";
import ReactVideoPlayer from "./ReactPlayer";
import { MdOutlineClose } from "react-icons/md";

type Props = {
  playingVid: string;
  setPlayingVid: (link: string) => void;
};

const VideoPlayerModal = ({ playingVid, setPlayingVid }: Props) => {
  useEffect(() => {
    const keyPressHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPlayingVid("");
      }
    };

    window.addEventListener("keydown", keyPressHandler);

    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, []);

  useEffect(() => {
    if (playingVid) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to revert overflow when component unmounts or modal closes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [playingVid]);

  if (!playingVid) return null;

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-[60] bg-black/80 backdrop-blur-sm flex justify-center items-center">
      <div className="w-11/12 sm:w-3/4 flex flex-col gap-2">
        <div className="absolute top-6 right-6 sm:relative sm:top-0 sm:right-0 w-full flex items-center justify-end">
          <div
            className="flex items-center gap-2 text-white text-lg cursor-pointer hover:text-white/90"
            onClick={() => setPlayingVid("")}
          >
            <p>Close</p>
            <MdOutlineClose className="size-6 " />
          </div>
        </div>
        <iframe
          className="w-full aspect-video"
          src={playingVid}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
        {/* <div className="w-full mx-auto aspect-video">
          <ReactVideoPlayer
            videoURL={playingVid}
            control={true}
            play={true}
            isMute={false}
          />
        </div> */}
      </div>
    </div>
  );
};

export default VideoPlayerModal;
