import React, { useCallback } from 'react';

import Billboard from '@/components/Billboard';
import MovieListNumber from '@/components/MovieListNumber';

const BillboardExtended: React.FC = ({data, title}) => {
  // console.log('data BillboardExtended', data);
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
    (item?.videoUrl)?<div className={`px-4 md:px-12 mb-[3vw] `} >
    <div>
      <p className="text-white text-xl md:text-2xl lg:text-4xl font-semibold mb-4">{title}</p>
      <div className={`gap-2  `}>
      <div className='relative'>
        <Billboard data={item} extended isComplited={onVideoCompleted} />
        <div className="absolute w-full left-0 bottom-0">
          <MovieListNumber title={data.title} data={data.items} setCurrentMovie={setItem} itemEnded={itemEnded} />
        </div>
      </div>
      </div>
    </div>
  </div>:null  
  )
}
export default BillboardExtended;
