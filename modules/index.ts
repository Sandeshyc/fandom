import Billboard from "@/modules/components/Billboard";
import BillboardSlider from "@/modules/components/BillboardSlider";
import Extended from '@/modules/components/Extended';
import Roll from "@/modules/components/Roll";
import MultiRawRoll from "@/modules/components/MultiRawRoll";
import Eventroll from "@/modules/components/EventRoll";
import Gradient from "@/modules/components/Gradient";
import Portrait from "@/modules/components/Portrait";
import Top10 from "@/modules/components/Top10";
import RollBordered from "@/modules/components/RollBordered";
import RollBorderedMulti from "@/modules/components/RollBorderedMulti";
import Navigation from "@/modules/components/Navigation";
import NavigationBack from '@/modules/elements/NavigationBack';
import DetailsHeroImage from "@/modules/components/DetailsHeroImage";
import PackageDetailsHeroImage from '@/modules/components/PackageDetailsHeroImage';
import PackageDetailsHeroImageMobile from '@/modules/components/PackageDetailsHeroImageMobile';
import MovieSummary from "@/modules/components/MovieSummary";
import WatchAndShare from "@/modules/components/WatchAndShare";
import MovieDetails from "@/modules/components/MovieDetails";
import Carousel from '@/modules/components/Carousel';
import PackageMovielist from '@/modules/components/PackageMovielist';
import PackageMovielistMobile from '@/modules/components/PackageMovielistMobile';
import MovieListVertical from '@/modules/components/MovieListVertical';
import MovieListVerticalGrid from '@/modules/components/MovieListVerticalGrid';
import MultiRawRollUpcoming from '@/modules/components/MultiRawRollUpcoming';
import MovieWatchList from '@/modules/components/MovieWatchList';
import ShareBtnGroup from '@/modules/components/ShareBtnGroup';
import WatchAndBuy from '@/modules/components/WatchAndBuy';
import Header from '@/modules/elements/Header';
import BottomNavigation from '@/modules/elements/Navigation/BottomNavigation';
import DealsAndOffers from '@/modules/components/DealsAndOffers';
import Footer from '@/components/Footer';
import ShowSummary from "./components/ShowSummary";
import SeasonDetails from "./components/SeasonDetails";
import BackNavigation from "./components/BackNavigation";
import WatchDetails from "./components/WatchDetails";

const comps = {
    header : Header,
    navigation : Navigation,
    backNavigation : BackNavigation,
    watchDetails : WatchDetails,
    roll : Roll,
    multirawroll : MultiRawRoll,
    eventroll : Eventroll,
    myPurchase : Roll,
    gradient : Gradient,
    potrait : Portrait,
    portrait : Portrait,
    top10 : Top10,
    rollBordered : RollBordered,
    rollBorderedMulti : RollBorderedMulti,
    billboard : BillboardSlider,
    extended : Extended,
    detailsHeroImage : DetailsHeroImage,
    movieSummary : MovieSummary,
    watchAndshare : WatchAndShare,
    shareBtnGroup : ShareBtnGroup,
    movieDetails : MovieDetails,
    packageMovielist : PackageMovielist,
    packageMovielistMobile : PackageMovielistMobile,
    packageDetailsHeroImage : PackageDetailsHeroImage,
    packageDetailsHeroImageMobile : PackageDetailsHeroImageMobile,
    carousel : Carousel,
    movieListVertical : MovieListVertical,
    movieListVerticalGrid : MovieListVerticalGrid,
    multirawrollupcoming : MultiRawRollUpcoming,
    movieWatchList : MovieWatchList,
    watchAndBuy : WatchAndBuy,
    bottomNavigation : BottomNavigation,
    dealsAndOffers : DealsAndOffers,
    footer : Footer,
    showSummary : ShowSummary,
    seasonDetails : SeasonDetails
}

const getComponent = (compName : string) => comps[compName as keyof typeof comps];

export {getComponent}