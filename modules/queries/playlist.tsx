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

export default PLAYLIST_QUERY;
