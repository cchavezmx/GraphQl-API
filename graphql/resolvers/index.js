import { Query } from './query.js'
import { Mutation } from './mutation.js'
import { Mutation as IntecsaMutations } from './INTECSA/mutation.js'
import { Query as IntecsaQuery } from './INTECSA/query.js'

export const resolvers = {
  Query,
  Mutation,
  IntecsaMutations,
  IntecsaQuery
}
