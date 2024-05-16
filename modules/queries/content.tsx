import { gql } from "@apollo/client";

const CONTENT_QUERY = gql`
  query ($input: QueryInput) {
    content (input: $input){
        _id
        assetId
        trailerUrl
        thumbnailBannerUrl
        thumbnailUrl
        thumbnailPortraitUrl
        thumbnailPortrait
        thumbnailLandscapeUrl
        publishSchedule
        releaseDate
        title
        contentRating
        contentType
        quality
        genre
        closeCaptions
        description
        episodeNumber
        episodeLabel
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
          canPlay
          canBuy
          bought
          validityAccepted
          transactionId
          message
          validityPeriod
        }        
        isInWatchList
        currentTime
        videoDuration
        hlsVideo
        dashVideo
        videoUrl
        trailerVideo
        onAirDate
        cast {
          _id
          celebrityId
          fullname
          imageBackground
          imageThumbnailMedium
          imageThumbnailSmall
          imageUrl
          imageUrlMobile
          isIndividual
        }
        director {
          _id
          celebrityId
          fullname
          imageBackground
          imageThumbnailMedium
          imageThumbnailSmall
          imageUrl
          imageUrlMobile
          isIndividual
        }
        writer {
          _id
          celebrityId
          fullname
          imageBackground
          imageThumbnailMedium
          imageThumbnailSmall
          imageUrl
          imageUrlMobile
          isIndividual
        }
        episodeLabel
        episodeNumber
        tvShowTitle
        tvShowId
        tvShowGenre
        tvShowDescription
        seasonNumber
        seasonDisplayText
      }
  }
`;

export default CONTENT_QUERY;
