import { gql } from "@apollo/client";

const WATCHLIST_QUERY = gql`
  query ($input: QueryInput) {
    watchlist (input: $input) {
      assetId
      items {
        _id
        assetId
        title
        description
        offAirDate
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
        thumbnailBannerUrl
        thumbnailLandscapeUrl
        thumbnailUrl
        thumbnailPortraitUrl        
        contentRating
        duration
        genre
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

export default WATCHLIST_QUERY;
