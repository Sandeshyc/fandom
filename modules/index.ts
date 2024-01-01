import MovieListReel from "@/modules/components/MovieListReel";
import MovieListTops from '@/components/MovieListTopsV2';
import MovieListReelBorderd from '@/modules/components/MovieListReelBorderd';
import NavigationHome from "@/modules/components/Navigation";
import DetailsHeroBanner from "@/modules/components/DetailsHeroBanner";
import PackageDetailsHeroBanner from '@/modules/components/PackageDetailsHeroBanner';
import MovieSummary from "@/modules/components/MovieSummary";
import WatchAndShare from "@/modules/components/WatchAndShare";
import MovieDetails from "@/modules/components/MovieDetails";
import Billboard from "@/modules/components/Billboard";
import BillboardExtended from '@/components/BillboardExtended';
import Carousel from '@/modules/components/Carousel';
import PackageMovielist from '@/modules/components/PackageMovielist';
import ImageGalleryReel from "@/modules/components/ImageGalleryReel";
import NavigationBack from '@/modules/elements/NavigationBack';

const comps = {
    navigation : NavigationHome,
    backNavigation : NavigationBack,
    roll : MovieListReel,
    myPurchase : MovieListReel,
    gradient : MovieListReel,
    potrait : MovieListReel,
    portrait : MovieListReel,
    top10 : MovieListTops,
    rollBordered : MovieListReelBorderd,
    animated : null,
    packageDetailsHeroImage : PackageDetailsHeroBanner, 
    packageMovielist : PackageMovielist, 
    detailsHeroImage : DetailsHeroBanner, 
    movieSummary : MovieSummary, 
    watchAndshare : WatchAndShare,
    movieDetails : MovieDetails,
    billboard : Billboard,
    extended : BillboardExtended,
    carousel : Carousel,
    imageHorizontalRail : null,
}

const getComponent = (compName : string) => comps[compName as keyof typeof comps];

export {getComponent}