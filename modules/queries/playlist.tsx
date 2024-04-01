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

export default PLAYLIST_QUERY;
