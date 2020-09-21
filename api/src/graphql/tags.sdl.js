export const schema = gql`
  type Tag {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    documentType: DocumentType!
    article: Article
    articleId: String
    tweet: Tweet
    tweetId: String
    label: String!
    uri: String!
    diffbotUris: [String]!
    dbpediaUris: [String]!
    rdfTypes: [String]!
    entityTypes: [String]!
    mentions: Int!
    confidence: Float!
    salience: Float!
    sentiment: Float!
    hasLocation: Boolean!
    latitude: Float
    longitude: Float
    precision: Float
  }

  enum DocumentType {
    ARTICLE
    TWEET
  }

  type Query {
    tags: [Tag!]!
  }

  input CreateTagInput {
    documentType: DocumentType!
    articleId: String
    tweetId: String
    label: String!
    uri: String!
    diffbotUris: [String]!
    dbpediaUris: [String]!
    rdfTypes: [String]!
    entityTypes: [String]!
    mentions: Int!
    confidence: Float!
    salience: Float!
    sentiment: Float!
    hasLocation: Boolean!
    latitude: Float
    longitude: Float
    precision: Float
  }

  input UpdateTagInput {
    documentType: DocumentType
    articleId: String
    tweetId: String
    label: String
    uri: String
    diffbotUris: [String]!
    dbpediaUris: [String]!
    rdfTypes: [String]!
    entityTypes: [String]!
    mentions: Int
    confidence: Float
    salience: Float
    sentiment: Float
    hasLocation: Boolean
    latitude: Float
    longitude: Float
    precision: Float
  }
`
