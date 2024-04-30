import { gql } from "@apollo/client";

const CONTINUE_WATCH_QUERY = gql`
  query ($input: QueryInput) {
    continuewatch (input: $input) {
      assetId

      items {
        _id
        assetId
        title
        description
        offAirDate
        thumbnailBannerUrl
        thumbnailPortrait
        trailerUrl
        onAirDate
        canBuy
        allowed {
          allowed
          canBuy
          canPlay
          message
          bought
        }
        thumbnailLandscapeUrl
        contentRating
        duration
        genre
        currentTime
        videoDuration
        header {
          text
          type
        }
        footer {
          text
          iconType
          textType
        }
      }
    }
  }
`;

export default CONTINUE_WATCH_QUERY;
