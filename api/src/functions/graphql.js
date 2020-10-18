import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices,
  ApolloError,
} from '@redwoodjs/api'
import schemas from 'src/graphql/**/*.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { getCurrentUser } from 'src/lib/auth'

import { applyMiddleware } from 'graphql-middleware'
import { allow, deny, _rule, shield } from 'graphql-shield'

import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db'

// const requireAuth = rule({ cache: 'contextual' })(
//   async (_parent, _args, _ctx, _info) => {
//     return true
//   }
// )

const queryPermissions = {
  '*': deny,
  articleById: allow,
  articles: allow,
  articlesForLabel: allow,
  paginateArticles: allow,
  tagSummaries: allow,
  tagSummariesForLabel: allow,
  paginateTagSummaries: allow,
  tweetById: allow,
  tweets: allow,
  tweetStats: allow,
  tweetsForLabel: allow,
  paginateTweets: allow,
  bumpChart: allow,
  lineChart: allow,
  repeaterJobs: allow,
  repeaterJob: allow,
  repeaterJobResults: allow,
  repeaterJobChart: allow,
  periodTotalStats: allow,
  popularTags: allow,
  lastDurationPeriodTotalStats: allow,
}

const permissions = shield(
  {
    Query: queryPermissions,
    Mutation: {
      '*': deny,
    },
  },
  {
    fallbackRule: allow, // this allows the nested types in a query to be resolved
    fallbackError: (thrownThing, _parent, args, _context, info) => {
      if (thrownThing instanceof ApolloError) {
        // expected errors
        logger.error({ args, thrownThing }, 'Not permitted')
        return new Error('Not permitted')
      } else if (thrownThing instanceof Error) {
        // unexpected errors
        logger.error({ args, thrownThing }, 'The resolver threw an error.')
        return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
      } else {
        logger.error(
          { args, thrownThing, info },
          'The resolver threw something that is not an error.'
        )
        return new Error('Not permitted')
      }
    },
  }
)
export const handler = createGraphQLHandler({
  getCurrentUser,
  schema: applyMiddleware(
    makeMergedSchema({
      schemas,
      services: makeServices({ services }),
    }),
    permissions
  ),
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
  onException: (e) => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
