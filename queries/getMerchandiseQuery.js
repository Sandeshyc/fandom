export default {
  name: "merchandiesData",
  query: `query merchandiseBlock {
  page(id: "17181", idType: DATABASE_ID) {
        id
    title
    biniFandompage {
      merchandiseBlock {
        fieldGroupName
        merchandiseDescription
        merchandiseTitle
        marchandiseCover {
          altText
          link
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
