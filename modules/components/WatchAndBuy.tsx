import React from "react";
import ErrorPopUp from "@/modules/elements/ErrorPopUp";
import RentPlayNotice from "@/modules/elements/Purchase/RentPlayNotice";
import TrailerRestartButton from "@/modules/elements/Purchase/TrailerRestartButton";
import RentPlayButtonAction from "@/modules/elements/Purchase/RentPlayButtonAction";
type Props = {
  data: any;
};
const WatchAndBuy = ({ data }: Props) => {
  return (
    <div className="relative z-10 bg-black/90">
      <div className="container mx-auto px-4">
        <RentPlayNotice data={data?.allowed} />
        {data?._id ? (
          <div className="flex flex-row items-center lg:mb-5 flex-wrap justify-between mx-[-7px]">
            <div className="w-1/2 px-[7px]">
              <RentPlayButtonAction
                data={data}
                allowedData={data?.allowed}
                size="full"
              />
            </div>
            <div className="w-1/2 px-[7px]">
              <TrailerRestartButton
                data={data?.allowed}
                itemId={data?._id}
                currentTime={data?.currentTime}
                size="full"
              />
            </div>
          </div>
        ) : (
          <ErrorPopUp message="Sorry, Something went wrong!" />
        )}
      </div>
    </div>
  );
};
export default WatchAndBuy;
