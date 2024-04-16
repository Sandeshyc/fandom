import { gql } from "@apollo/client";

const BUNDLE_QUERY = gql`
  query ($input: QueryInput) {
    bundle(input: $input) {
      assetId
      name
      description
      title

      items {
        _id
        assetId
        title
        description
        offAirDate
        onAirDate
        canBuy
        allowed
        trailerUrl
        thumbnailBannerUrl
        thumbnailUrl
        thumbnailPortraitUrl
        thumbnailLandscapeUrl
        contentRating
        publishSchedule
        cast
        director
        writer
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

export default BUNDLE_QUERY;
