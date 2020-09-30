import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices,
  ApolloError,
} from '@redwoodjs/api'
import schemas from 'src/graphql/**/*.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { applyMiddleware } from 'graphql-middleware'
import { allow, deny, shield } from 'graphql-shield'

import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db'

const queryPermissions = {
  '*': deny,
  tweetById: allow,
  tweets: allow,
  paginateTweets: allow,
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
    fallbackError: (thrownThing, _parent, args, _context, _info) => {
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
          { args, thrownThing },
          'The resolver threw something that is not an error.'
        )
        return new Error('Not permitted')
      }
    },
  }
)
export const handler = createGraphQLHandler({
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
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
