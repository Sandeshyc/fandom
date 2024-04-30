import React from "react";
import LinkRoute from "@/modules/Identities/LinkRoute";
import { PlayIcon } from "@heroicons/react/24/solid";
import DisabledButton from "@/modules/elements/Purchase/DisabledButton";
import { isOnAir } from "@/utils/dataTimeChecking";
type Props = {
    data: any;
    itemId: string;
    size?: 'sm' | 'md' | 'lg';
    onAirDate?: string; 
};
const RentPlayButtonLink = (inputProps: Props) => {
    const { data, itemId, size, onAirDate } = inputProps;
    const detailUrl = `/details/${itemId}`;
    const watchUrl = `/watch/${itemId}`;
    let rentBtnTxt = "Rent";
    if(onAirDate && !isOnAir(onAirDate)){
        rentBtnTxt = "Pre-book";
    }
    return (
        <>
        {(data?.allowed) ? (
            <>
            {(data?.canPlay)?(
                <LinkRoute href={watchUrl} type="white" size={size}>
                    {((size !== 'sm') && (size !== 'md')) && (<PlayIcon className="w-5 text-black mr-2" />)}
                    Play Now
                </LinkRoute>
            )
            :
            (
                <DisabledButton stage="play" size={size}>
                    {((size !== 'sm') && (size !== 'md')) && (<PlayIcon className="w-5 text-black mr-2" />)}                    
                    Play Now
                </DisabledButton>
            )}
            </>
        ) : (
            <>
            {(data?.canBuy)?(
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