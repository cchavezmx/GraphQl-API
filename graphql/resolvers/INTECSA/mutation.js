import { ApolloError } from 'apollo-server-core'
import { Experimental } from '../../../models/index.js'

export const Mutation = {
  saveExpermientalList: async (_, { busqueda }, context, info) => {
    try {
      const response = new Experimental({ value: busqueda })
      const newExperimental = await response.save()
      return `Saved ${newExperimental._id}`
    } catch (error) {
      return new ApolloError(error)
    }
  }
}
