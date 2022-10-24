import { ApolloError } from 'apollo-server-core'
import { Owner, Proyecto, Clientes, Lotes } from '../../models/index.js'

export const Query = {

  owners: async () => {
    try {
      const ownersFetched = await Owner.find()
      return ownersFetched.map(owner => {
        return {
          ...owner._doc,
          _id: owner.id,
          createdAt: new Date(owner._doc.createdAt).toISOString()
        }
      })
    } catch (error) {

    }
  },
  getOwnersBySlug: async (_, { slug }, context, info) => {
    try {
      const owner = await Owner.findOne({ slug })
      return { ...owner._doc, _id: owner.id }
    } catch (error) {
      return new ApolloError(error)
    }
  },
  getProyectosByOwner: async (_, { owner }, context, info) => {
    try {
      const proyectos = await Proyecto.find({ owner }).populate('owner')
      const respose = proyectos.map(proyecto => {
        return {
          ...proyecto._doc,
          _id: proyecto.id
        }
      })
      return respose
    } catch (error) {
      return new ApolloError(error)
    }
  },
  getAllClients: async () => {
    try {
      const clients = await Clientes.find()
      return clients.map(client => {
        return {
          ...client._doc,
          _id: client.id
        }
      })
    } catch (error) {
      return new ApolloError(error)
    }
  },
  getLotesByProject: async (_, { proyecto }, context, info) => {
    try {
      const client = await Lotes.find({ proyecto }).populate('cliente')
      const response = client.map(lote => {
        if (!lote.cliente) (console.log('🚀 ~ file: query.js ~ line 59 ~ response ~ lote', lote))
        return {
          ...lote._doc,
          _id: lote.id,
          clienteData: lote.cliente
        }
      })
      return response
    } catch (error) {
      return new ApolloError(error)
    }
  }

}
