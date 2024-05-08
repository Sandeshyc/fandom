import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ShareBtnGroup = () => {
  return (
    <div className="bg-black pt-4 pb-8">
      <div className="container mx-auto px-4">
        <div className="text-white/80 flex justify-center items-end overflow-y-hidden overflow-x-auto relative z-10 border border-white/30 rounded-xl">
          <div className="w-[100px] text-center">
            <Skeleton
              baseColor="#333"
              highlightColor="#666"
              height={40}
              width={40}
              circle={true}
            />
            <Skeleton
              baseColor="#333"
              highlightColor="#666"
              height={14}
              width={60}
            />
          </div>
          <div className="w-[100px] text-center">
            <Skeleton
              baseColor="#333"
              highlightColor="#666"
              height={40}
              width={40}
              circle={true}
            />
            <Skeleton
              baseColor="#333"
              highlightColor="#666"
              height={14}
              width={60}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShareBtnGroup;
