import React, { useCallback } from 'react';

import Billboard from '@/components/Billboard';
import MovieListTops from '@/components/MovieListTops';
import SvgNumbers from '@/utils/SvgNumbers'

const Top10: React.FC = ({data, title}) => {
  // console.log('data', data);
  const [item, setItem] = React.useState(data?.items[0] || {}); 

  const [itemEnded, setItemEnded] = React.useState(1);

  console.log('jw video completed 3', itemEnded);

  return (
    <>
      <div className='relative'>
        <div >
          <MovieListTops title={'Top Ten Movies in Philippines' || data.title} data={data.items} portrait  />
        </div>
      </div>
    </>
  )
}
export default Top10;
