import React from "react";
import { stableKeys } from "@/utils/stableKeys";
import DetailsTab from '@/components/DetailsTab';
type dataProps = {
    data: any,
    module: any
}
const SeasonDetails = (inputProps:dataProps) => {
    const {data} = inputProps
  return (
    <div className='text-white z-10 relative bg-black'>
      <div className='container mx-auto px-4'>
        <DetailsTab data={data} isPackage={false} isShow={true}/>
      </div>
    </div>
  );
}
export default SeasonDetails;