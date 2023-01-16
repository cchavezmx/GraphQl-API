import { ApolloError } from 'apollo-server-core'
import { Experimental, Reembolso } from '../../../models/index.js'

export const Mutation = {
  saveExpermientalList: async (_, { busqueda, user }, context, info) => {
    try {
      const response = new Experimental({ value: busqueda, user })
      const newExperimental = await response.save()
      return `Saved ${newExperimental._id}`
    } catch (error) {
      return new ApolloError(error)
    }
  },
  saveReembolsoPeriodo: async (_, { reembolso }, context, info) => {
    try {
      const response = new Reembolso(reembolso)
      const newReembolso = await response.save()
      const ID = newReembolso._id.toString()
      return ID
    } catch (error) {
      return new ApolloError(error)
    }
  }
}
