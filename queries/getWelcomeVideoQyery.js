export default {
  name: "welcomeVideo",
  query: `query welcomeVideo {
  page(id: "17181", idType: DATABASE_ID) {
        id
    title
    biniFandompage {
      welcomeVideoBlock {
        fieldGroupName
        videoEmbed
        thumbnailImage {
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
}`,
};
