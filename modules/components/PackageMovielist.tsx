import React, { useEffect } from "react";
import MovieListHeroBanner from "@/modules/elements/MovieListHeroBanner";
import MovieListHeroBannerItems from "@/modules/elements/MovieListHeroBannerItems";
import ReelHeading from "@/modules/elements/ReelHeading";
import useIsMobile from "@/hooks/useIsMobile";
import PackageMovielistMobile from "@/modules/components/PackageMovielistMobile";
import DetailsTab from "@/components/DetailsTab";
import { usePackageMovielist } from "@/stores/UserStore";

type Props = {
  data: any;
  title: string;
};
const PackageMovielist = ({ data, title }: Props) => {
  if (!data) return null;
  const isMobile = useIsMobile();
  const [item, setItem] = React.useState(data[0] || {});
  const titleMobile = title;
  title += data?.length > 0 ? " (" + data?.length + ")" : "";
  const [itemEnded, setItemEnded] = React.useState(1);
  const onVideoCompleted = (completed: boolean) => {
    if (completed === true) {
      setItemEnded(itemEnded + 1);
    }
  };
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
  return (
    <>
      {item?._id ? (
        isMobile && 0 ? (
          <PackageMovielistMobile data={data} title={titleMobile} />
        ) : (
          <>
            <div className={`py-[5vw] movieListHeroBanner bg-black`}>
              <div className="px-4 max-w-[1600px] mx-auto">
                <ReelHeading title={title} />
              </div>
              <div className="relative">
                <MovieListHeroBanner
                  data={item}
                  isComplited={onVideoCompleted}
                />
                <div className="absolute left-0 right-0 bottom-0 pl-4 md:pl-16">
                  <MovieListHeroBannerItems
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
            <div className="bg-black text-white pt-8">
              <div className="container mx-auto px-4">
                <DetailsTab data={item} isPackage={true} />
              </div>
            </div>
          </>
        )
      ) : null}
    </>
  );
};
export default PackageMovielist;