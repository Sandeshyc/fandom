import { gql } from "@apollo/client";

const PACKAGES_QUERY = gql`
  query ($input: QueryInput) {
    packages (input: $input) {
      assetId

      items {
        _id
        assetId
        title
        description
        offAirDate
        thumbnailBannerUrl
        thumbnailPortrait
        thumbnailUrl
        thumbnailPortraitUrl
        thumbnailLandscapeUrl
        trailerUrl
        onAirDate
        canBuy
        allowed
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

export default PACKAGES_QUERY;
