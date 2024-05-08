import DetailsHeroImage from "@/modules/skeletons/components/DetailsHeroImage";
import ShowSummary from "@/modules/skeletons/components/ShowSummary";
import MovieListVerticalGrid from "@/modules/skeletons/components/MovieListVerticalGrid";
import Billboard from "@/modules/skeletons/components/Billboard";
import Roll from "@/modules/skeletons/components/Roll";
import EventRoll from "@/modules/skeletons/components/EventRoll";
import Top10 from "@/modules/skeletons/components/Top10";
import RollBordered from "@/modules/skeletons/components/RollBordered";
import RollBorderedMulti from "@/modules/skeletons/components/RollBorderedMulti";
import MovieListVertical from "@/modules/skeletons/components/MovieListVertical";
import MovieWatchList from "@/modules/skeletons/components/MovieWatchList";
import MovieSummary from "@/modules/skeletons/components/MovieSummary";
import WatchAndshare from "@/modules/skeletons/components/WatchAndshare";
import MovieDetails from "@/modules/skeletons/components/MovieDetails";
import PackageDetailsHeroImage from "@/modules/skeletons/components/PackageDetailsHeroImage";
import PackageMovielist from "@/modules/skeletons/components/PackageMovielist";
import Carousel from "@/modules/skeletons/components/Carousel";
import MultiRawRoll from "@/modules/skeletons/components/MultiRawRoll";
import MultiRawRollUpcoming from "@/modules/skeletons/components/MultiRawRollUpcoming";
import ChannelPlayer from "@/modules/skeletons/components/ChannelPlayer";
import ChannelDetails from "@/modules/skeletons/components/ChannelDetails";
import WatchAndBuy from "@/modules/skeletons/components/WatchAndBuy";
import ShareBtnGroup from "@/modules/skeletons/components/ShareBtnGroup";
type Props = {
    displayType: string;
}
const GetComponent = ({displayType}:Props) => {
    const comps = {
        billboard : Billboard,
        carousel : Carousel,
        detailsHeroImage : DetailsHeroImage,
        movieSummary : MovieSummary,
        showSummary : ShowSummary,
        movieListVerticalGrid : MovieListVerticalGrid,
        roll : Roll,
        eventroll : EventRoll,
        top10 : Top10,
        rollBordered : RollBordered,
        rollBorderedMulti : RollBorderedMulti,
        movieListVertical : MovieListVertical,
        movieWatchList : MovieWatchList,
        watchAndshare : WatchAndshare,
        movieDetails : MovieDetails,
        packageDetailsHeroImage : PackageDetailsHeroImage,
        packageMovielist : PackageMovielist,
        multirawroll : MultiRawRoll,
        multirawrollupcoming : MultiRawRollUpcoming,
        ChannelPlayer : ChannelPlayer,
        ChannelDetails : ChannelDetails,
        watchAndBuy : WatchAndBuy,
        shareBtnGroup : ShareBtnGroup,
    }
    const Component = comps[displayType as keyof typeof comps];
    return (<>{Component && <Component />}</>)
}
export default GetComponent;
