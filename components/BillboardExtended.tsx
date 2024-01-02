import React, { useCallback } from 'react';

import Billboard from '@/components/Billboard';
import MovieListNumber from '@/modules/elements/ExtendedBillboardRoll';
import ReelHeading from '@/modules/elements/ReelHeading';

const BillboardExtended: React.FC = ({data, title}) => {
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
          <Billboard data={item} extended isComplited={onVideoCompleted} />
          <div className="absolute left-0 right-0 bottom-0 pl-4 md:pl-16">
              <MovieListNumber title={data.title} data={data} setCurrentMovie={setItem} itemEnded={itemEnded} />
          </div>
        </div>
      </div>
    </div>
  </div>:null  
  )
}
export default BillboardExtended;
