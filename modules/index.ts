import MovieListReel from "@/modules/components/MovieListReel";
import MovieListTops from '@/components/MovieListTopsV2';
import MovieListReelBorderd from '@/modules/components/MovieListReelBorderd';
import Navigation from "@/modules/components/Navigation";
import DetailsHeroBanner from "@/modules/components/DetailsHeroBanner";
import MovieSummary from "@/modules/components/MovieSummary";
import WatchAndShare from "@/modules/components/WatchAndShare";
import MovieDetails from "@/modules/components/MovieDetails";
import Billboard from "@/modules/components/Billboard";
import BillboardExtended from '@/components/BillboardExtended';
import Carousel from '@/modules/components/Carousel';

const comps = {
    navigation : Navigation,
    roll : MovieListReel,
    myPurchase : MovieListReel,
    gradient : MovieListReel,
    potrait : MovieListReel,
    top10 : MovieListTops,
    rollBordered : MovieListReelBorderd,
    animated : null,
    detailsHeroImage : DetailsHeroBanner, 
    movieSummary : MovieSummary, 
    watchAndshare : WatchAndShare,
    movieDetails : MovieDetails,
    billboard : Billboard,
    extended : BillboardExtended,
    carousel : Carousel,
}

const getComponent = (compName : string) => comps[compName as keyof typeof comps];

export {getComponent}