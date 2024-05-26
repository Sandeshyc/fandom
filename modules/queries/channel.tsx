import { gql } from "@apollo/client";

const CHANNEL_QUERY = gql`
  query ($input: QueryInput) {
    channel(input: $input) {
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
        hlsVideo
        dashVideo
        allowed {
          allowed
          canBuy
          canPlay
          message
          bought
        }
        allowedPlans {
          id
          name
          priceSKU
          googlePriceSKU
          description
          price
          currency
          promoText
        }
        isInWatchList
        contentRating
        contentType
        header {
          text
          type
        }
    }
  }
`;

export default CHANNEL_QUERY;
