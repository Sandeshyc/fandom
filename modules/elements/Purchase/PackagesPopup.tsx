import React, {useState, useEffect} from "react";
import Modal from '@mui/material/Modal';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import PlanItem from '@/modules/elements/Purchase/PlanItem';
import NoPlanFound from '@/modules/elements/Purchase/NoPlanFound';
import ItemDetails from '@/modules/elements/Purchase/ItemDetails';
import WarningMessage from '@/modules/Identities/WarningMessage';
import { stableKeys } from '@/utils/stableKeys';
import { isOnAir } from "@/utils/dataTimeChecking";
type Props = {
    allowedPlans: any;
    data: any;
    movieId: string;
    setIsPackagePopupOpen?: () => void;
    isPackagePopupOpen: boolean;
};
const PackagesPopup = ({
    allowedPlans,
    data,
    movieId,
    setIsPackagePopupOpen,
    isPackagePopupOpen
}:Props) => {
    let rentBtnTxt = "Rent";
    const onAirDate = data?.onAirDate;
    if(onAirDate && !isOnAir(onAirDate)){
        rentBtnTxt = "Pre-book";
    }
    const { isLoginUser, isLoadingUserCheck } = useCheckAuthentication();
    const handleClose = () => {
        setIsPackagePopupOpen && setIsPackagePopupOpen();
    };
    return (
        <Modal
            open={isPackagePopupOpen}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            onClose={handleClose}
            className='flex justify-center jkBuyModal'>
                <div className='border-[3px] border-[#262626] rounded-md  bg-opacity-[100%] w-[90%] max-w-[1200px] bg-[#1A1A1A] px-[10px] lg:px-[20px] py-[30px] relative'>
                <button
                onClick={handleClose}
                className='absolute top-0 right-0 text-white text-4xl px-2 py-1 active:opacity-65'>
                    &times;
                </button>
                <div 
                    className='
                    text-white
                    mb-2
                    w-full'>
                    <h3 className='text-xl md:text-2xl font-semibold '>Choose Your Plan</h3>
                </div>
                <ItemDetails data={data}/>
                {(Array.isArray(allowedPlans) && allowedPlans?.length > 0) ? (<>
                    <div className={`${allowedPlans?.length<5 ? 'justify-center' : ''} flex overflow-x-auto planListsWrapper`}>
                        {allowedPlans?.map((item:any, index:number)=>{
                            return (<PlanItem 
                                key={stableKeys[index]}
                                item={item}
                                movieId={movieId}
                                rentText={rentBtnTxt}
                                itemData={data}
                            />)
                        })}
                    </div>
                    {(!isLoginUser)&&
                    <WarningMessage 
                    message='You need to login to proceed with this transaction.'
                    className='mt-2 max-w-[420px] mx-auto'/>
                    }
                </>):(<NoPlanFound/>)}
            </div>
            </Modal>
    );
};
export default PackagesPopup;