import React from 'react';
import MovieListHeroBanner from '@/modules/elements/MovieListHeroBanner';
import MovieListHeroBannerItems from '@/modules/elements/MovieListHeroBannerItems';
import ReelHeading from '@/modules/elements/ReelHeading';
import useIsMobile from '@/hooks/useIsMobile';
import PackageMovielistMobile from '@/modules/components/PackageMovielistMobile';
import MovieDetailsTab from '@/modules/elements/MovieDetailsTab';

type Props = {
  data: any;
  title: string;
}
const PackageMovielist = ({data, title}:Props) => {
  if(!data) return null;
  const isMobile = useIsMobile();
  const [item, setItem] = React.useState(data[0] || {}); 
  const titleMobile = title;
  title += data?.length > 0 ? ' ('+data?.length+')' : '';
  const [itemEnded, setItemEnded] = React.useState(1);
  const onVideoCompleted = (completed:boolean) => {
    if(completed === true){
      setItemEnded(itemEnded + 1);
    }
  }
  return (<>
    {(item?._id)?(isMobile && 0)?(<PackageMovielistMobile data={data} title={titleMobile}/>):
    <>
    <div className={`my-[5vw] movieListHeroBanner`} >
      <div>
        <div className="px-2 max-w-[1600px] mx-auto"><ReelHeading title={title}/></div>
          <div className={`gap-2`}>
            <div className='relative'>
              <MovieListHeroBanner data={item} isComplited={onVideoCompleted} />
              <div className="absolute left-0 right-0 bottom-0 pl-4 md:pl-16">
                  <MovieListHeroBannerItems 
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
    <MovieDetailsTab data={item} isPackage={true}/>
    </>
  :
    null}
  </> 
  )
}
export default PackageMovielist;
