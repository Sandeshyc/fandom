import { gql } from "@apollo/client";

const PLAYLIST_HEADER_QUERY = gql`
  query ($input: QueryInput) {
    playlistHeader(input: $input) {
      assetId
      _id
      title
      name
      duration
      publishSchedule
      thumbnailUrl
      contentRating
      noOfMovie
      canBuy
      allowed
      allowedPlans {
        priceSKU
      }
      trailerUrl
      isInWatchList
      packageShortDetails
    }
  }
`;

export default PLAYLIST_HEADER_QUERY;
