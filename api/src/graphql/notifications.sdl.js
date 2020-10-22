export const schema = gql`
  type Notification {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    documentType: DocumentType!
    action: NotificationAction!
    message: String!
    tweet: Tweet
    article: Article
    tweetId: String
    articleId: String
  }

  enum DocumentType {
    ARTICLE
    TWEET
  }
  enum NotificationAction {
    CREATE
    UPDATE
    VIEW
  }

  type Query {
    notifications: [Notification!]!
    notification(id: String!): Notification
  }

  input CreateNotificationInput {
    documentType: DocumentType!
    action: NotificationAction!
    message: String!
    tweetId: String
    articleId: String
  }

  input UpdateNotificationInput {
    documentType: DocumentType
    action: NotificationAction
    message: String
    tweetId: String
    articleId: String
  }

  type Mutation {
    createNotification(input: CreateNotificationInput!): Notification!
    updateNotification(
      id: String!
      input: UpdateNotificationInput!
    ): Notification!
    deleteNotification(id: String!): Notification!
  }
`
