import React, { useCallback } from 'react';
// import {AnimatedRow} from 'imp-design-system';

import Billboard from '@/components/Billboard';
import MovieListNumber from '@/components/MovieListNumber';

const Animated: React.FC = ({data, title}) => {
  console.log('data', data);
  
  return (
    <>

<div className={`px-4 md:px-12 mb-[3vw] movieSlider `}>
      <div>
        <p className="text-white text-xl md:text-2xl lg:text-4xl font-semibold mb-4">{title}</p>
        <div className={`gap-2  `}>
        {/* <AnimatedRow title={title} data={data.items} /> */}
        </div>
      </div>
    </div>
    </>
  )
}
export default Animated;
