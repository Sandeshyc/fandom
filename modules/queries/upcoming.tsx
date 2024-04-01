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

export default UPCOMING_QUERY;
