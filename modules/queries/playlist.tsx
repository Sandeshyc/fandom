import { gql } from "@apollo/client";

const PLAYLIST_QUERY = gql`
  query ($input: QueryInput) {
    playlist(input: $input) {
      assetId

      items {
        _id
        assetId
        title
        description
        offAirDate
        onAirDate
        canBuy
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
        }
      }
    }
  }
`;

export default PLAYLIST_QUERY;
