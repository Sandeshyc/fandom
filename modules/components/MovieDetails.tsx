import React from 'react';
import DetailsTab from '@/components/DetailsTab';
import MovieDetailsTab from '@/modules/elements/MovieDetailsTab';
import MovieDetailsTab2 from '@/modules/elements/MovieDetailsTab2';

type dataProps = {
    data: any;
}
const MovieSummary = ({data}:dataProps) => {
  return (  
  <>
  <div className='bg-black text-white pt-4'>      
    <div className="container mx-auto px-4">
      <DetailsTab data={data}/>
    </div>
  </div>
  </>
  );
  
}
export default MovieSummary;