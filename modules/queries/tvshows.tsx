import { gql } from "@apollo/client";

const TVSHOWS_QUERY = gql`
  query ($input: QueryInput) {
    tvshows(input: $input) {
        _id
        name
        title
        description
        genre
        trailerUrl
        thumbnailBannerUrl
        thumbnailLandscapeUrl
        thumbnailPortraitUrl
        thumbnailUrl
    }
  }
`;

export default TVSHOWS_QUERY;
