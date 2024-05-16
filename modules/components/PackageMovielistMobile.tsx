import React, { use, useEffect } from "react";
import MovieListHeroBannerMobile from "@/modules/elements/MovieListHeroBannerMobile";
import MovieListHeroBannerItemsMobile from "@/modules/elements/MovieListHeroBannerItemsMobile";
import DetailsTab from "@/components/DetailsTab";
import { usePackageMovielist } from "@/stores/UserStore";
import ReelHeading from "@/modules/elements/ReelHeading";
type Props = {
  data: any;
  title: string;
};
const PackageMovielistMobile = ({ data, title }: Props) => {
  if (!data) return null;
  const [item, setItem] = React.useState(data[0] || {});
  const [itemEnded, setItemEnded] = React.useState(1);
  const onVideoCompleted = (completed: boolean) => {
    if (completed === true) {
      setItemEnded(itemEnded + 1);
    }
  };
  title += data?.length > 0 ? " (" + data?.length + ")" : "";
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      usePackageMovielist.setState({
        hasMovieList: true,
        movieListOfset:
          (document
            .querySelector(".movieListHeroBanner")
            ?.getBoundingClientRect()?.top || 0) + window.scrollY,
      });
    }
  }, [data]);
  return item?._id ? (
    <>
      <div className={`py-[5vw] movieListHeroBanner bg-black`}>
        <div className="px-4 max-w-[1600px] mx-auto">
          <ReelHeading title={title} />
        </div>
        <div className="relative bg-black">
          <MovieListHeroBannerMobile
            data={item}
            isComplited={onVideoCompleted}
          />
          <div className="pl-4">
            <MovieListHeroBannerItemsMobile
              title={data.title}
              portrait={false}
              data={data}
              className={`mt-2`}
              setCurrentMovie={setItem}
              itemEnded={itemEnded}
            />
          </div>
        </div>
      </div>
      <div className="bg-black text-white pt-0">
        <div className="container mx-auto px-4">
          <DetailsTab data={item} isPackage={true} />
        </div>
      </div>
    </>
  ) : null;
};
export default PackageMovielistMobile;
