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
import BillboardExtended2 from '@/modules/components/BillboardExtended2';
import ImageGalleryReel from "@/modules/components/ImageGalleryReel";

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
    watchAndshare : null,
    movieDetails : MovieDetails,
    billboard : Billboard,
    extended : BillboardExtended2,
    carousel : Carousel,
    imageHorizontalRail : null,
}

const getComponent = (compName : string) => comps[compName as keyof typeof comps];

export {getComponent}