import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonSearch = () => {
  return (
    <>
    <div className="flex lg:hidden flex-wrap mx-[-10px]">
      {new Array(8).fill(0).map((_, index) => (
        <div
          key={index}
          className="p-[10px] flex flex-col justify-end relative movieCard w-1/2 sm:w-1/3  md:w-1/4"
        >
          <Skeleton
            baseColor="#333"
            highlightColor="#666"
            className="aspect-[6/9] w-full"
          />
        </div>
      ))}
    </div>
    <div className="hidden lg:flex flex-wrap mx-[-7px] lg:mx-[-15px]">
      {new Array(9).fill(0).map((_, index) => (
        <div
          key={index}
          className="w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 p-[7px] lg:p-[15px] pt-0"
        >
          <Skeleton
            baseColor="#333"
            highlightColor="#666"
            className="aspect-video w-full"
          />
        </div>
      ))}
    </div>
    </>
  )
}

export default SkeletonSearch