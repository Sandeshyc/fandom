import React from 'react';
import { MovieInterface } from '@/types';
import { useQuery } from '@apollo/client';
import queryMap from '@/modules/queries';
import MovieCardPurchase from '@/components/MovieCardPurchase';
import { stableKeys } from '@/utils/stableKeys';
import SkeletonListCard from '@/components/Skeleton/ListCard';
import { NoMovies } from '@/modules/Identities/NoFound';
type Props = {
    data: any;
}
const PurchasesAll = ({ data }: Props) => {
    const { loading, error, data: gqData } = useQuery(queryMap['purchasesAll'], 
        {variables: 
            {input: data }
        }
    );
    console.log('userData:', data, 'gqData: ', gqData, 'loading: ', loading, 'error: ', error, );
    let allTicketsItems = gqData?.purchasesAll?.items;
    return (
        <>
        {(!loading)?
                <>{(Array.isArray(allTicketsItems) && allTicketsItems?.length > 0)?allTicketsItems.map((item:MovieInterface, index:number) => (
                <div className='w-full lg:w-1/2 2xl:w-1/3 px-2 mb-4' key={stableKeys[index]}>
                    <MovieCardPurchase
                    data={item}
                    />
                </div>
                )):<NoMovies/>}
                </>:
            <div className="flex flex-wrap w-full">
                <SkeletonListCard count={5}/>
            </div>
            }
        </>
    );
}
export default PurchasesAll;