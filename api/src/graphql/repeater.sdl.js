export const schema = gql`
  type RepeaterJob {
    name: String!
    enabled: Boolean
    endpoint: String!
    verb: String!
    headers: JSON
    body: JSON
    retryable: Boolean
    runAt: DateTime
    runEvery: String
    createdAt: DateTime!
    updatedAt: DateTime!
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

  type Query {
    repeaterJobs(status: String): [RepeaterJob!]!
    repeaterJob(name: String!): RepeaterJob
    repeaterJobResults(name: String!): [RepeaterJobResult!]
    repeaterJobChart(name: String!): LineChart!
  }
`
