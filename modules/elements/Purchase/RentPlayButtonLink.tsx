import React from "react";
import LinkRoute from "@/modules/Identities/LinkRoute";
import { PlayIcon } from "@heroicons/react/24/solid";
import DisabledButton from "@/modules/elements/Purchase/DisabledButton";
import { isOnAir } from "@/utils/dataTimeChecking";
type Props = {
    data: any;
    allowedData: any;
    itemId: string;
    size?: 'sm' | 'md' | 'lg'; 
};
const RentPlayButtonLink = (inputProps: Props) => {
    const { data, itemId, size, allowedData } = inputProps;
    let detailUrl = `/details/${itemId}`;
    if(data?.__typename === 'Series'){
        detailUrl = `/tvshow/${itemId}`;
    }else if(data?.__typename === 'Channel'){
        detailUrl = `/channel/${itemId}`;
    }
    
    const watchUrl = `/watch/${itemId}`;
    let rentBtnTxt = "Rent";
    let playNowTxt = "Play Now";
    if(data?.onAirDate && !isOnAir(data?.onAirDate)){
        rentBtnTxt = "Pre-book";
    }
    if(data?.currentTime && data?.currentTime > 0){
        playNowTxt = "Resume";
    }
    return (
        <>
        {(allowedData?.allowed) ? (
            <>
            {(allowedData?.canPlay)?(
                <LinkRoute href={watchUrl} type="white" size={size}>
                    {((size !== 'sm') && (size !== 'md')) && (<PlayIcon className="w-5 text-black mr-2" />)}
                    {playNowTxt}
                </LinkRoute>
            )
            :
            (
                <DisabledButton stage="play" size={size}>
                    {((size !== 'sm') && (size !== 'md')) && (<PlayIcon className="w-5 text-black mr-2" />)}                    
                    {playNowTxt}
                </DisabledButton>
            )}
            </>
        ) : (
            <>
            {(allowedData?.canBuy)?(
                <LinkRoute href={`${detailUrl}/?viewPlan=true`} type="primary" size={size}>
                    {rentBtnTxt}
                </LinkRoute>
            )
            :
            (
                <DisabledButton stage="rent" size={size}>
                    {rentBtnTxt}
                </DisabledButton>
            )}
            </>
        )}
        </>
    );
}
export default RentPlayButtonLink;