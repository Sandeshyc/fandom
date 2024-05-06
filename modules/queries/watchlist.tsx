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
        contentType
        allowed {
          allowed
          canBuy
          canPlay
          message
          bought
        }
        trailerUrl
        thumbnailBannerUrl
        thumbnailPortrait
        thumbnailUrl
        thumbnailPortraitUrl
        thumbnailLandscapeUrl        
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
          textType
        }
      }
    }
  }
`;

export default WATCHLIST_QUERY;
