import React from 'react';
import MovieListHeroBanner from '@/modules/elements/MovieListHeroBanner';
import MovieListHeroBannerItems from '@/modules/elements/MovieListHeroBannerItems';
import ReelHeading from '@/modules/elements/ReelHeading';

type Props = {
  data: any;
  title: string;
}
const PackageMovielist = ({data, title}:Props) => {
  // console.log('data BillboardExtended', data);
  const [item, setItem] = React.useState(data[0] || {}); 
  
  title += data?.length > 0 ? ' ('+data?.length+')' : '';
  const [itemEnded, setItemEnded] = React.useState(1);

  // get event from billboard when video is completed
  const onVideoCompleted = (completed:boolean) => {
    // console.log('jw video completed 2', itemEnded);
    // console.log('jw video completed 2', completed);
    if(completed === true){
      setItemEnded(itemEnded + 1);
    }
  }

  return (
    (item?._id)?<div className={`mb-[3vw] movieListHeroBanner`} >
    <div>
      <div className="px-2 max-w-[1600px] mx-auto"><ReelHeading title={title}/></div>
      <div className={`gap-2`}>
        <div className='relative'>
          <MovieListHeroBanner data={item} isComplited={onVideoCompleted} />
          <div className="absolute left-0 right-0 bottom-0 pl-4 md:pl-16">
              <MovieListHeroBannerItems title={data.title} data={data} setCurrentMovie={setItem} itemEnded={itemEnded} />
          </div>
        </div>
      </div>
    </div>
  </div>:null  
  )
}
export default PackageMovielist;
