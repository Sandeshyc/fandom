import "react-loading-skeleton/dist/skeleton.css";
import { FilmReel } from "@/utils/CustomSVGs";
const DetailsHeroImage = () => {
  return (
    <div className="relative z-0 mb-[-100px] md:mb-[-180px]">
      <div className="shadow-md rounded-t-lg jk_player h-[350px] md:h-[90vh] max-h-[100%] min-h-[400px] md:min-h-[700px] bg-gradient-to-b to-black from-gray-500 flex justify-center items-center">
        <div className="w-[200px] sm:w-[350px] xl:w-[450px] opacity-20 flex justify-center items-center">
          <FilmReel />
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full h-full z-10 bg-black/30'}`}
      />
    </div>
  );
};
export default DetailsHeroImage;
