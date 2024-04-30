import { gql } from "@apollo/client";

const BUNDLE_HEADER_QUERY = gql`
  query ($input: QueryInput) {
    bundleHeader(input: $input) {
      assetId
      _id
      title
      description
      name
      duration
      publishSchedule
      thumbnailBannerUrl
      thumbnailPortrait
      thumbnailUrl
      thumbnailPortraitUrl
      thumbnailLandscapeUrl
      contentRating
      noOfMovie
      canBuy
      allowed {
        allowed
        canBuy
        canPlay
        message
        bought
      }
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
      trailerUrl
      isInWatchList
      packageShortDetails
      isPackage
    }
  }
`;

export default BUNDLE_HEADER_QUERY;
