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
      isInWatchList
      allowed {
        allowed
        canBuy
        canPlay
        message
        bought
      }
      
      contentRating
      allowedPlans {
        currency
        description
        id
        name
        price
        priceSKU
      }
      seasons: items {
        _id
        name
        title
        allowed {
          allowed
          canBuy
          canPlay
          message
          bought
        }
        
        description
        duration
        itemCode
        publishSchedule
        thumbnailUrl
        messages
        contentRating
        trailerUrl
        assetId
        allowedPlans {
          currency
          description
          id
          name
          price
          priceSKU
        }
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
          allowed {
            allowed
            canBuy
            canPlay
            message
            bought
          }
          isPackage
          currentTime
          videoDuration
          onAirDate
        }
      }
    }
  }
`;

export default TVSHOW_QUERY;
