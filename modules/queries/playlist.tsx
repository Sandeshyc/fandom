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
        duration        
        videoDuration
        genre
        isInWatchList
        header {
          text
          type
        }
        footer {
          text
          iconType
          textType
        }
        previewVideo {
          dash
          hls
        }
      }
    }
  }
`;

export default PLAYLIST_QUERY;
