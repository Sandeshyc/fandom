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
        contentType
        sourcePlatform
        planDescription
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
        currentTime 
        videoDuration
        isInWatchList      
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

export default PURCHASES_QUERY;
