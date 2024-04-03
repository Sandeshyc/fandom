import React from 'react';
import DetailsTab from '@/components/DetailsTab';
import MovieDetailsTab from '@/modules/elements/MovieDetailsTab';

import { useQuery } from '@apollo/client';
import CONTENT_QUERY from '../queries/content';

type dataProps = {
    data: any,
    module: any
}
const MovieSummary = (inputProps:dataProps) => {

  const {module} = inputProps
  const { loading, error, data: gqData } = useQuery(CONTENT_QUERY, 
    {variables: {input: {id: module.itemCode, userId: module.userId}}});
  const data = gqData?.content;
  // if (loading) return <p>Loading...</p>;
  // if (error) console.log('ERRR********** ', error.message)
  console.log('MovieSummary********** ', data)

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