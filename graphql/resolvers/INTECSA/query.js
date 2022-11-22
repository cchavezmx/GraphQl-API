import { ApolloError } from 'apollo-server-core'
import { Experimental } from '../../../models/index.js'

export const Query = {
  getAllExperimentalFromArray: async (_, { busqueda }, context, info) => {
    try {
      const response = await Experimental.find()
      const alldata = response.filter(item => item && item.value)
      const mapDAta = alldata.map(item => item.value)
      const splitData = mapDAta.map(item => item.split(','))
      const flatData = splitData.flat(Infinity)
      const onlyValues = [...new Set(flatData)]
      return onlyValues
    } catch (error) {
      return new ApolloError(error)
    }
  }
}
