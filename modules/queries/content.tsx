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
        title
        contentRating
        quality
        genre
        canBuy
        cast
        writer
        director
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
        allowed
        isPackage
        currentTime
        videoDuration
      }
  }
`;

export default CONTENT_QUERY;
