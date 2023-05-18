import React, { useCallback } from 'react';

import Billboard from '@/components/Billboard';
import MovieListNumber from '@/components/MovieListNumber';

const BillboardExtended: React.FC = ({data}) => {
  console.log('data', data);
  const [item, setItem] = React.useState(data?.items[0] || {}); 

  const [itemEnded, setItemEnded] = React.useState(1);

  // get event from billboard when video is completed
  const onVideoCompleted = (completed) => {
    console.log('jw video completed 2', itemEnded);
    console.log('jw video completed 2', completed);
    if(completed === true){
      setItemEnded(itemEnded + 1);
    }
  }

  console.log('jw video completed 3', itemEnded);

  return (
    <>
      <div className='relative'>
        <Billboard data={item} extended isComplited={onVideoCompleted} />
        <div className="absolute w-full left-0 bottom-0">
          <MovieListNumber title={data.title} data={data.items} setCurrentMovie={setItem} itemEnded={itemEnded} />
        </div>
      </div>
    </>
  )
}
export default BillboardExtended;
