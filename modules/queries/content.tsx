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
        header {
          text
          type
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
        cc {
          caption
          url
        }
        relatedContent {
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

export default CONTENT_QUERY;
