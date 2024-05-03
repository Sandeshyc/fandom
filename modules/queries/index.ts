import CONTENT_QUERY from "./content";
import PLAYLIST_QUERY from "./playlist";
import UPCOMING_QUERY from "./upcoming";
import PACKAGES_QUERY from "./packages";
import CONTINUE_WATCH_QUERY from "./contunueWatch";
import PURCHASES_QUERY from "./purchases";
import WATCHLIST_QUERY from "./watchlist";
import PLAYLIST_HEADER_QUERY from "./playlistHeader";
import TVSHOWS_QUERY from "./tvshows";
import TVSHOW_QUERY from "./tvshow";
import BUNDLE_HEADER_QUERY from "./bundleHeader";
import BUNDLE_QUERY from "./bundle";
import SEARCH_CONTENT from "./searchContent";
import CHANNELS_QUERY from "./channels";
import CHANNEL_QUERY from "./channel";

const queryMap = {
    playlist: PLAYLIST_QUERY,
    upcoming: UPCOMING_QUERY,
    content: CONTENT_QUERY,
    packages: PACKAGES_QUERY,
    continuewatch: CONTINUE_WATCH_QUERY,
    purchases: PURCHASES_QUERY,
    watchlist: WATCHLIST_QUERY,
    playlistHeader: PLAYLIST_HEADER_QUERY,
    tvshows: TVSHOWS_QUERY,
    tvshow: TVSHOW_QUERY,
    bundle: BUNDLE_QUERY,
    bundleHeader: BUNDLE_HEADER_QUERY,
    searchContent: SEARCH_CONTENT,
    channels: CHANNELS_QUERY,
    channel: CHANNEL_QUERY
}

export default queryMap;