import React, { useCallback } from 'react';

import Billboard from '@/components/Billboard';
import MovieListNumber from '@/components/MovieListNumber';

const Top10: React.FC = ({data, title}) => {
  console.log('data', data);
  const [item, setItem] = React.useState(data?.items[0] || {}); 

  const [itemEnded, setItemEnded] = React.useState(1);

  console.log('jw video completed 3', itemEnded);

  return (
    <>
      <div className='relative'>
        <div >
          {title && 
          <div className={` md:px-12  `}>
            <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
            </div>}
          <MovieListNumber title={data.title} data={data.items} setCurrentMovie={setItem} itemEnded={itemEnded} />
        </div>
      </div>
    </>
  )
}
export default Top10;
