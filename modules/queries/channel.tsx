import { gql } from "@apollo/client";

const CHANNEL_QUERY = gql`
  query ($input: QueryInput) {
    channel(input: $input) {
        _id
        name
        title
        description
        genre
        trailerUrl
        thumbnailBannerUrl
        thumbnailLandscapeUrl
        thumbnailPortraitUrl
        thumbnailUrl
        hlsVideo
        dashVideo
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

export default CHANNEL_QUERY;
