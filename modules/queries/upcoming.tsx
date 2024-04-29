import { gql } from "@apollo/client";

const UPCOMING_QUERY = gql`
  query ($input: QueryInput) {
    upcoming (input: $input) {
      assetId
      items {
        _id
        assetId
        title
        description
        offAirDate
        thumbnailBannerUrl
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
        publishSchedule
        thumbnailPortrait
        thumbnailPortraitUrl
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

export default UPCOMING_QUERY;
