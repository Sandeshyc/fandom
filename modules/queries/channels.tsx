import { gql } from "@apollo/client";

const CHANNELS_QUERY = gql`
  query ($input: QueryInput) {
    channels(input: $input) {
        _id
        assetId
        contentType
        title
        description
        genre
        trailerUrl
        thumbnailBannerUrl
        thumbnailLandscapeUrl
        thumbnailPortraitUrl
        thumbnailUrl
        allowed {
          allowed
          canBuy
          canPlay
          message
          bought
        }
        isInWatchList
        contentRating
        header {
          text
          type
        }
    }
  }
`;

export default CHANNELS_QUERY;
