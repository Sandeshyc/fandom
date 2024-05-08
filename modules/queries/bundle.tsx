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
        isInWatchList
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
        publishSchedule
        releaseDate
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
          textType
        }
      }
    }
  }
`;

export default BUNDLE_QUERY;
