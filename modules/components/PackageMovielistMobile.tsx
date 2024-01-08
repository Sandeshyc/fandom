import React from 'react';
import MovieListHeroBannerMobile from '@/modules/elements/MovieListHeroBannerMobile';
import MovieListHeroBannerItemsMobile from '@/modules/elements/MovieListHeroBannerItemsMobile';

type Props = {
  data: any;
  title: string;
}
const PackageMovielistMobile = ({data, title}:Props) => {
  // console.log('data BillboardExtended', data);
  const [item, setItem] = React.useState(data[0] || {}); 
  const [itemEnded, setItemEnded] = React.useState(1);
  const onVideoCompleted = (completed:boolean) => {
    if(completed === true){
      setItemEnded(itemEnded + 1);
    }
  }
  return (
    (item?._id)?<div className={`my-[5vw] movieListHeroBanner`} >
    <div>
      <div className="px-2 max-w-[1600px] mx-auto">
        {(title)?<p className="text-white text-xl lg:text-2xl	font-medium mb-2 mr-2">{title}</p>:null}
      </div>
      <div className={`gap-2`}>
        <div className='relative'>
          <MovieListHeroBannerMobile data={item} isComplited={onVideoCompleted} />
          <div className="absolute left-0 right-0 bottom-0">
            <MovieListHeroBannerItemsMobile 
              title={data.title} 
              portrait={false}
              data={data} 
              className={`mt-2`}
              setCurrentMovie={setItem} 
              itemEnded={itemEnded} />
          </div>
        </div>
      </div>
    </div>
  </div>:null  
  )
}
export default PackageMovielistMobile;
