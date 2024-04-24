import { gql } from "@apollo/client";

const PURCHASES_QUERY = gql`
  query ($input: QueryInput) {
    purchases (input: $input) {
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
        endTime        
        header {
          text
          type
        }
        footer {
          text
          iconType
        }
      }
    }
  }
`;

export default PURCHASES_QUERY;
