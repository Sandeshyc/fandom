import Billboard from "@/modules/components/Billboard";
import Extended from '@/modules/components/Extended';
import Roll from "@/modules/components/Roll";
import Gradient from "@/modules/components/Gradient";
import Portrait from "@/modules/components/Portrait";
import Top10 from "@/modules/components/Top10";
import RollBordered from "@/modules/components/RollBordered";
import NavigationHome from "@/modules/components/Navigation";
import NavigationBack from '@/modules/elements/NavigationBack';
import DetailsHeroImage from "@/modules/components/DetailsHeroImage";
import PackageDetailsHeroImage from '@/modules/components/PackageDetailsHeroImage';
import MovieSummary from "@/modules/components/MovieSummary";
import WatchAndShare from "@/modules/components/WatchAndShare";
import MovieDetails from "@/modules/components/MovieDetails";
import Carousel from '@/modules/components/Carousel';
import PackageMovielist from '@/modules/components/PackageMovielist';
import MovieListVertical from '@/modules/components/MovieListVertical';

const comps = {
    navigation : NavigationHome,
    backNavigation : NavigationBack,
    roll : Roll,
    myPurchase : Roll,
    gradient : Gradient,
    potrait : Portrait,
    portrait : Portrait,
    top10 : Top10,
    rollBordered : RollBordered,
    billboard : Billboard,
    extended : Extended,
    detailsHeroImage : DetailsHeroImage, 
    movieSummary : MovieSummary, 
    watchAndshare : WatchAndShare,
    movieDetails : MovieDetails,
    packageDetailsHeroImage : PackageDetailsHeroImage, 
    packageMovielist : PackageMovielist, 
    carousel : Carousel,
    movieListVertical : MovieListVertical,
}

const getComponent = (compName : string) => comps[compName as keyof typeof comps];

export {getComponent}