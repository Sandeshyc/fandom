import React from "react";
import FlowerWhiteLoader from "./FlowerWhiteLoader";

const Preloader = () => {
  return (
    <div
      className={`relative min-h-screen min-w-screen flex justify-center items-center bg-gradient-to-b from-[#11355efb] via-[#11355E] to-[#14375ffb]`}
    >
      <FlowerWhiteLoader />
    </div>
  );
};
export default Preloader;
