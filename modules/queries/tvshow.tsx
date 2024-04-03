import { gql } from "@apollo/client";

const TVSHOW_QUERY = gql`
  query ($input: QueryInput) {
    tvshow(input: $input) {
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
      seasons: items {
        name
        episodes: items {
          _id
          assetId
          trailerUrl
          thumbnailBannerUrl
          thumbnailUrl
          thumbnailPortraitUrl
          publishSchedule
          title
          contentRating
          quality
          genre
          canBuy
          cast
          writer
          director
          description
          allowedPlans {
            id
            name
            currency
            description
            currency
            price
            priceSKU
            googlePriceSKU
          }
          messages
          allowed
          isPackage
          currentTime
          videoDuration
        }
      }
    }
  }
`;

export default TVSHOW_QUERY;
