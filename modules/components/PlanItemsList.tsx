import React from 'react';
import PlanItemCard from '@/modules/elements/PlanItemCard';
import { NoPlanFound } from '@/modules/Identities/NoFound';
import { stableKeys } from '@/utils/stableKeys';
import { type } from 'os';
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
            </>:
        <NoPlanFound/>}
    </>);
}
export default PlanItemsList;