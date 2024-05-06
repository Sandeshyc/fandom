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
        allowed {
          allowed
          canBuy
          canPlay
          message
          bought
        }
        isInWatchList
        contentRating
        
        header {
          text
          type
        }
        publishSchedule
        type
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

export default TVSHOWS_QUERY;
