import React from 'react';
import DetailsTab from '@/components/DetailsTab';
import MovieDetailsTab from '@/modules/elements/MovieDetailsTab';

type dataProps = {
    data: any;
}
const MovieSummary = ({data}:dataProps) => {
    return (<MovieDetailsTab data={data}/>);
  //   return (<div className='my-16 z-10 relative'>      
  //   <div className="max-w-[1600px] mx-auto px-[15px]">
  //     <div
  //       className='rounded-md bg-black p-4 pb-8 border border-gray-800 text-white'>
  //       <DetailsTab data={data}/>
  //     </div>
  //   </div>
  // </div>);
  
}
export default MovieSummary;