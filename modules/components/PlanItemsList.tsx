import React from 'react';
import PlanItemCard from '@/modules/elements/PlanItemCard';
import { NoPlanFound } from '@/modules/Identities/NoFound';
import { stableKeys } from '@/utils/stableKeys';
import WarningMessage from '@/modules/Identities/WarningMessage';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
type Props = {
    allowedPlans: any;
    isPackage: boolean;
    movieId: string;
}
const PlanItemsList = ({ 
    allowedPlans,
    isPackage,
    movieId
}:Props) => {
    const {isLoginUser, isLoadingUserCheck} = useCheckAuthentication();
    // console.log('allowPlans',allowedPlans);
    return (<>
        {(Array.isArray(allowedPlans) && allowedPlans.length > 0)?<>
            <div className={`${allowedPlans?.length<5 ? 'justify-center' : ''} flex overflow-x-auto planListsWrapper`}>
                {allowedPlans.map((item:any, index:number) => {
                    return (<PlanItemCard
                        key={stableKeys[index]}
                        item={item}
                        movieId={movieId}
                        isPackage={isPackage}
                    />);
                })}
            </div>
            {(!isLoginUser)&&
            <WarningMessage 
            message='You need to login to proceed with this transaction.'
            className='mt-2 max-w-[420px] mx-auto'/>
            }
            </>:
        <NoPlanFound/>}
    </>);
}
export default PlanItemsList;