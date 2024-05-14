import React from "react";
import { MovieInterface } from "@/types";
import { useQuery } from "@apollo/client";
import queryMap from "@/modules/queries";
import MovieCardPurchase from "@/components/MovieCardPurchase";
import MovieCardPurchasePortrait from "@/components/MovieCardPurchasePortrait";
import { stableKeys } from "@/utils/stableKeys";
import PurchaseCard from '@/components/Skeleton/PurchaseCard';
import PurchaseCardPortrait from '@/components/Skeleton/PurchaseCardPortrait';
import { NoMovies } from "@/modules/Identities/NoFound";
type Props = {
  data: any;
};
const PurchasesAll = ({ data }: Props) => {
  const {
    loading,
    error,
    data: gqData,
  } = useQuery(queryMap["purchasesAll"], { variables: { input: data } });
  console.log(
    "userData:",
    data,
    "gqData: ",
    gqData,
    "loading: ",
    loading,
    "error: ",
    error
  );
  let allTicketsItems = gqData?.purchasesAll?.items;
  return (
    <>
      {(!loading) ? (
        <>
          {Array.isArray(allTicketsItems) && allTicketsItems?.length > 0 ? (
            allTicketsItems.map((item: MovieInterface, index: number) => (
              <div
                className="hidden sm:block w-full sm:w-1/2 xl:w-1/3 2xl:w-1/4 px-[14px] mb-[14px]"
                key={stableKeys[index]}
              >
                <MovieCardPurchasePortrait data={item} />
              </div>
            ))
          ) : (
            <NoMovies />
          )}
          {Array.isArray(allTicketsItems) && allTicketsItems?.length > 0 ? (
            allTicketsItems.map((item: MovieInterface, index: number) => (
              <div
                className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 sm:hidden px-[14px] mb-[14px]"
                key={stableKeys[index]}
              >
                <MovieCardPurchasePortrait data={item} />
              </div>
            ))
          ) : (
            <NoMovies />
          )}
        </>
      ) : (
        <>
        <div className="sm:flex flex-wrap w-full hidden">
            <PurchaseCardPortrait count={8}/>
        </div>
        <div className="w-full sm:hidden">
            <PurchaseCardPortrait count={8}/>
        </div>
        </>
      )}
    </>
  );
};
export default PurchasesAll;
