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
        allowed
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
        }
      }
    }
  }
`;

export default PURCHASES_QUERY;
