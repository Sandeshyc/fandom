import React from 'react';
import MovieListHeroBannerMobile from '@/modules/elements/MovieListHeroBannerMobile';
import MovieListHeroBannerItemsMobile from '@/modules/elements/MovieListHeroBannerItemsMobile';
import DetailsTab from '@/components/DetailsTab';

type Props = {
  data: any;
  title: string;
}
const PackageMovielistMobile = ({data, title}:Props) => {
  // console.log('data BillboardExtended', data);
  if(!data) return null;
  const [item, setItem] = React.useState(data[0] || {}); 
  const [itemEnded, setItemEnded] = React.useState(1);
  const onVideoCompleted = (completed:boolean) => {
    if(completed === true){
      setItemEnded(itemEnded + 1);
    }
  }
  title += data?.length > 0 ? ' ('+data?.length+')' : '';
  return (
    (item?._id)?
    <>
    <div className={`my-[5vw] movieListHeroBanner`} >
      <div>
        <div className="px-2 max-w-[1600px] mx-auto">
          {(title)?<p className="text-white text-xl lg:text-2xl	font-medium mb-2 mr-2">{title}</p>:null}
        </div>
        <div className={`gap-2`}>
          <div className='relative bg-black'>
            <MovieListHeroBannerMobile data={item} isComplited={onVideoCompleted} />
            <div className="pl-4">
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
    </div>
    <div className='bg-black text-white pt-0'>      
      <div className="container mx-auto px-4">
        <DetailsTab data={item} isPackage={true}/>
      </div>
    </div>
  </>
  :null  
  )
}
export default PackageMovielistMobile;
