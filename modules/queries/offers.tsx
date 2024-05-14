import { gql } from "@apollo/client";

const OFFERS_QUERY = gql`
  query ($input: QueryInput) {
    offers(input: $input) {
      _id
      promoId
      title
      thumbnailUrl
      items {
        _id
        title
        description
        contentRating
        duration
        allowed {
          allowed
          canPlay
          canBuy
          bought
          validityAccepted
          validityPeriod
          transactionId
          message
        }
        isInWatchList
        contentType
        genre
        thumbnailUrl
        thumbnailPortraitUrl
        thumbnailPortrait
        thumbnailLandscapeUrl
        thumbnailBannerUrl
        trailerUrl
        trailerVideo
      }
    }
  }
`;

export default OFFERS_QUERY;
