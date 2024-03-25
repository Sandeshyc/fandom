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
import MovieWatchList from '@/modules/components/MovieWatchList';
import ShareBtnGroup from '@/modules/components/ShareBtnGroup';
import WatchAndBuy from '@/modules/components/WatchAndBuy';
import Header from '@/modules/elements/Header';
import BottomNavigation from '@/modules/elements/Navigation/BottomNavigation';
import DealsAndOffers from '@/modules/components/DealsAndOffers';
import Footer from '@/components/Footer';

const comps = {
    header : Header,
    navigation : Navigation,
    backNavigation : NavigationBack,
    roll : Roll,
    multirawroll : MultiRawRoll,
    eventroll : Eventroll,
    myPurchase : Roll,
    gradient : Gradient,
    potrait : Portrait,
    portrait : Portrait,
    top10 : Top10,
    rollBordered : RollBordered,
    billboard : BillboardSlider,
    extended : Extended,
    detailsHeroImage : DetailsHeroImage, 
    movieSummary : MovieSummary, 
    watchAndshare : WatchAndShare,
    shareBtnGroup : ShareBtnGroup,
    movieDetails : MovieDetails,
    packageDetailsHeroImage : PackageDetailsHeroImage, 
    packageMovielist : PackageMovielist, 
    carousel : Carousel,
    movieListVertical : MovieListVertical,
    movieWatchList : MovieWatchList,
    watchAndBuy : WatchAndBuy,
    bottomNavigation : BottomNavigation,
    dealsAndOffers : DealsAndOffers,
    footer : Footer,
    packageDetailsHeroImageMobile : PackageDetailsHeroImageMobile,
    packageMovielistMobile : PackageMovielistMobile 
}

const getComponent = (compName : string) => comps[compName as keyof typeof comps];

export {getComponent}