import React, {useState, useEffect} from "react";
import LinkRoute from "@/modules/Identities/LinkRoute";
import { PlayIcon } from "@heroicons/react/24/solid";
import DisabledButton from "@/modules/elements/Purchase/DisabledButton";
import PackagesPopup from '@/modules/elements/Purchase/PackagesPopup';
import RentButton from '@/modules/elements/Purchase/RentButton';
type Props = {
    data: any;
    allowedData: any;
    size?: 'sm' | 'md' | 'lg' | 'full';
};
const RentPlayButtonAction = (inputProps: Props) => {
    const { data, size, allowedData } = inputProps;
    const [isPackagePopupOpen, setIsPackagePopupOpen] = useState(false);
    const watchUrl = `/watch/${data?._id}`;
    useEffect(() => {
        // URLSearchParams perchasePlan 
        const urlParams = new URLSearchParams(window?.location?.search);
        if(urlParams?.get('viewPlan') === 'true' && !(allowedData?.allowed) && allowedData?.canBuy){
          setTimeout(() => {
            setIsPackagePopupOpen(true);
          }, 1000);
        }
    }, [data, allowedData]);
    return (
        <>
        {(isPackagePopupOpen)&&(
            <PackagesPopup 
                allowedPlans={data?.allowedPlans}
                data={data}
                movieId={data?._id}
                isPackagePopupOpen={isPackagePopupOpen}
                setIsPackagePopupOpen={() => setIsPackagePopupOpen(false)}
            />
        )}
        {(allowedData?.allowed) ? (
            <>
            {(allowedData?.canPlay)?(
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
            {(allowedData?.canBuy)?(
                <RentButton type='active'
                    size={size}
                    onClick={() => setIsPackagePopupOpen(true)}
                >Rent</RentButton>
            )
            :
            (
                <DisabledButton stage="rent" size={size}>
                    Rent
                </DisabledButton>
            )}
            </>
        )}
        </>
    );
}
export default RentPlayButtonAction;