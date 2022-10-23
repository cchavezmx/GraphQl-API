import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'

import Keyv from 'keyv'
import { KeyvAdapter } from '@apollo/utils.keyvadapter'
import { typeDefs } from './graphql/schema/index.js'
import { resolvers } from './graphql/resolvers/index.js'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import http from 'http'
dotenv.config()
const PORT = process.env.PORT || 4000

async function startApolloServer () {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: resolvers.Query,
      Mutation: resolvers.Mutation
    },
    cache: new KeyvAdapter(new Keyv(process.env.REDIS_URL)),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true,
    playground: true
  })

  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@gti.tcrun.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  const options = { useNewUrlParser: true, useUnifiedTopology: true }

  await server.start()
  server.applyMiddleware({ app, path: '/api' })

  mongoose.connect(uri, options)
    .then(async () => {
      await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve))
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    })
}

startApolloServer()
