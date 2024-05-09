import { gql } from "@apollo/client";

const CONTENT_QUERY = gql`
  query ($input: QueryInput) {
    content (input: $input){
        _id
        assetId
        trailerUrl
        thumbnailBannerUrl
        thumbnailUrl
        thumbnailPortraitUrl
        thumbnailPortrait
        thumbnailLandscapeUrl
        publishSchedule
        releaseDate
        title
        contentRating
        contentType
        quality
        genre
        canBuy
        description
        allowedPlans {
          id
          name
          currency
          description
          currency
          price
          priceSKU
          googlePriceSKU
        }
        messages
        allowed {
          allowed
          canPlay
          canBuy
          bought
          validityAccepted
          transactionId
          message
          validityPeriod
        }
        isPackage
        isInWatchList
        currentTime
        videoDuration
        hlsVideo
        dashVideo
        videoUrl
        trailerVideo
        onAirDate
      }
  }
`;

export default CONTENT_QUERY;
