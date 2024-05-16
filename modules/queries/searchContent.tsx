import { gql } from "@apollo/client";

const SEARCH_CONTENT = gql`
  query ($input: QueryInput) {
    searchContent(input: $input) {
      currentPage
      pageNumber
      pageSize
      totalItems
      totalPages
      totalRecords
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
        currentTime
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
      }
    }
  }
`;

export default SEARCH_CONTENT;
