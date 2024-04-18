import React from 'react';
import DetailsTab from '@/components/DetailsTab';
import MovieDetailsTab from '@/modules/elements/MovieDetailsTab';


type dataProps = {
    data: any,
    module: any
}
const MovieSummary = (inputProps:dataProps) => {

  const {data} = inputProps


  return (  
    <div className='bg-black text-white pt-4'>      
      <div className="container mx-auto px-4">
        <DetailsTab data={data}/>
      </div>
    </div>
  );
  
}
export default MovieSummary;