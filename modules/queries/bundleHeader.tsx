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
      thumbnailUrl
      contentRating
      noOfMovie
      canBuy
      allowed
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
    }
  }
`;

export default BUNDLE_HEADER_QUERY;
