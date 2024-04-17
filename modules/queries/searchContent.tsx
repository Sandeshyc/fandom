import { gql } from "@apollo/client";

const SEARCH_CONTENT = gql`
  query ($input: QueryInput) {
    searchContent(input: $input) {
      totalRecords
      pageNumber
      pageNumber
      totalPages
      items {
        trailerUrl
        thumbnailBannerUrl
        thumbnailUrl
        thumbnailPortraitUrl
        thumbnailPortrait
        thumbnailLandscapeUrl
        publishSchedule
        title
        description
      }
    }
  }
`;

export default SEARCH_CONTENT;
