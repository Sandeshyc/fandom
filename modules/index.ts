import MovieListReel from "@/modules/components/MovieListReel";
import Navigation from "@/modules/components/Navigation";
import DetailsHeroBanner from "@/modules/components/DetailsHeroBanner";
import MovieSummary from "@/modules/components/MovieSummary";
import WatchAndShare from "@/modules/components/WatchAndShare";
import MovieDetails from "@/modules/components/MovieDetails";
import Billboard from "@/modules/components/Billboard";

const comps = {
    roll : MovieListReel,
    navigation : Navigation,
    detailsHeroImage : DetailsHeroBanner, 
    movieSummary : MovieSummary, 
    watchAndshare : WatchAndShare,
    movieDetails : MovieDetails,
    billboard : Billboard,
}

const getComponent = (compName : string) => comps[compName as keyof typeof comps];

export {getComponent}