export default {
  name: "exclusiveLivestream",
  query: `query livestreamBlock {
  page(id: "17181", idType: DATABASE_ID) {
        id
    title
    biniFandompage {
      fieldGroupName
      liveStreamBlock {
        fieldGroupName
        blockTitle
        shortDescription
        liveStreamVideo
        livestreamLists {
          ... on Page_Binifandompage_LiveStreamBlock_LivestreamLists_LivestreamItem {
            fieldGroupName
            livestreamTitle
            videoEmbed
            thumbnail {
              altText
              caption
              sourceUrl
              srcSet
              status
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
