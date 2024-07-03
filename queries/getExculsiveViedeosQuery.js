export default {
  name: "exclusiveVideos",
  query: `query exclusiveVideos {
  page(id: "17181", idType: DATABASE_ID) {
        id
    title
    biniFandompage {
      exclusiveVideosBlock {
        fieldGroupName
        blockTitle
        videosList {
          ... on Page_Binifandompage_ExclusiveVideosBlock_VideosList_VideoItem {
            fieldGroupName
            shortDescription
            videoTitle
            videoEmbed
            videoThumbnail {
              altText
              caption
              sourceUrl
              srcSet
              title
              uri
            }
          }
        }
      }
    }
  }
}`,
};
