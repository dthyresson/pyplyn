export const schema = gql`
  type RepeaterJob {
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    enabled: Boolean
    endpoint: String!
    verb: String!
    headers: JSON
    body: JSON
    retryable: Boolean
    runAt: DateTime
    runEvery: String
    lastRunAt: DateTime
    nextRunAt: DateTime
  }

  type RepeaterJobResult {
    status: String!
    headers: JSON
    body: JSON
    runAt: DateTime
    run: Int
    duration: Int
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type RepeaterJobDecodedHeader {
    name: String!
    decodedToken: JSON
    issuedAt: DateTime
    expiresIn: DateTime
    subject: String
  }

  type Query {
    repeaterJobs(status: String): [RepeaterJob!]!
    repeaterJob(name: String!): RepeaterJob
    repeaterJobResults(name: String!): [RepeaterJobResult!]
    repeaterJobChart(name: String!): LineChart!
    repeaterJobDecodedHeader(name: String!): RepeaterJobDecodedHeader!
  }

  type Mutation {
    deleteCompletedRepeaterJobs: [RepeaterJob]!
  }
`
