import React, { useCallback } from 'react';

import Billboard2 from '@/components/Billboard2';
import MovieListNumber from '@/components/MovieListNumber';
import MovieListNumber2 from '@/components/MovieListNumber2';
import ReelHeading from '@/modules/elements/ReelHeading';

const BillboardExtended2: React.FC = ({data, title}) => {
  // console.log('data BillboardExtended', data);
  const [item, setItem] = React.useState(data[0] || {}); 

  const [itemEnded, setItemEnded] = React.useState(1);

  // get event from billboard when video is completed
  const onVideoCompleted = (completed) => {
    // console.log('jw video completed 2', itemEnded);
    // console.log('jw video completed 2', completed);
    if(completed === true){
      setItemEnded(itemEnded + 1);
    }
  }

  // console.log('jw video completed 3', itemEnded);

  return (
    (item?.videoUrl)?<div className={`mb-[3vw]`} >
    <div>
      <div className="px-4 md:px-16"><ReelHeading title={title} /></div>
      <div className={`gap-2`}>
        <div className='relative'>
          <Billboard2 data={item} extended isComplited={onVideoCompleted} />
          <div className="absolute left-0 right-0 bottom-0 pl-4 md:pl-16">
              <MovieListNumber2 title={data.title} data={data} setCurrentMovie={setItem} itemEnded={itemEnded} />
          </div>
        </div>
      </div>
    </div>
  </div>:null  
  )
}
export default BillboardExtended2;
