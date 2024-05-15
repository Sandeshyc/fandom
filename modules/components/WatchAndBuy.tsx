import React from "react";
import ErrorPopUp from "@/modules/elements/ErrorPopUp";
import RentPlayNotice from "@/modules/elements/Purchase/RentPlayNotice";
import TrailerRestartButton from "@/modules/elements/Purchase/TrailerRestartButton";
import RentPlayButtonAction from "@/modules/elements/Purchase/RentPlayButtonAction";
import {
  AccessTimeOutlined
} from '@mui/icons-material';
import { isOnAir } from "@/utils/dataTimeChecking";
import {
  convertESTtoLocalTime,
} from "@/utils/yearFromDate";
type Props = {
  data: any;
};
const WatchAndBuy = ({ data }: Props) => {
  const onAirDate = data?.onAirDate;
  return (
    <div className="relative z-10 bg-black/90">
      <div className="container mx-auto px-4">
      {(onAirDate && !isOnAir(onAirDate))?( 
            <div className='block mb-4'>
                <RentPlayNotice data={data?.allowed} />
                <p className="text-white/90 text-sm mt-1 flex justify-start aligns-center">
                    <AccessTimeOutlined className='mr-1' 
                        sx={{fontSize: '1.2rem'}}/>
                    <span>{convertESTtoLocalTime(data?.onAirDate as string)}</span>
                </p> 
            </div>                  
        )
        :(
            <RentPlayNotice data={data?.allowed} />
        )}
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
          <ErrorPopUp message="This content is not available now." />
        )}
      </div>
    </div>
  );
};
export default WatchAndBuy;
