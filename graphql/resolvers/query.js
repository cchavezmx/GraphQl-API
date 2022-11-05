import { ApolloError } from 'apollo-server-core'
import { Owner, Proyecto, Clientes, Lotes, Pagos } from '../../models/index.js'
import { ObjectId } from 'mongodb'

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
        console.log('🚀 ~ file: query.js ~ line 60 ~ response ~ lote', lote)

        if (!lote.cliente) (console.log('🚀 ~ file: query.js ~ line 59 ~ response ~ lote', lote))
        return {
          ...lote._doc,
          _id: lote.id,
          clienteData: { name: lote.cliente.name, _id: lote.cliente._id }
        }
      })
      return response
    } catch (error) {
      return new ApolloError(error)
    }
  },
  getAllPagosFromLote: async (_, { lote, proyecto, cliente }, context, info) => {
    const agg = [
      {
        $match: {
          lote: new ObjectId(lote)
        }
      },
      {
        $match: {
          proyecto: new ObjectId(proyecto)
        }
      },
      {
        $match: {
          cliente: new ObjectId(cliente)
        }
      },
      {
        $lookup: {
          from: 'clientes',
          localField: 'cliente',
          foreignField: '_id',
          as: 'clienteData'
        }
      },
      {
        $unwind: '$clienteData'
      },
      {
        $lookup: {
          from: 'proyectos',
          localField: 'proyecto',
          foreignField: '_id',
          as: 'proyectoData'
        }
      },
      {
        $unwind: '$proyectoData'
      },
      {
        $lookup: {
          from: 'lotes',
          localField: 'lote',
          foreignField: '_id',
          as: 'loteData'
        }
      },
      {
        $unwind: '$loteData'
      },
      {
        $lookup: {
          from: 'owners',
          localField: 'proyectoData.owner',
          foreignField: '_id',
          as: 'ownerData'
        }
      },
      {
        $unwind: '$ownerData'
      }

    ]

    try {
      const loteFound = await Pagos.aggregate(agg)
      const pagos = loteFound.map(pago => {
        return {
          ...pago,
          deposito: pago.deposito ?? pago.mensualidad.toString()
        }
      })
      console.log('🚀 ~ file: query.js ~ line 83 ~ getAllPagosFromLote: ~ loteFound', pagos)
      return pagos
    } catch (error) {
      return new ApolloError(error)
    }
  }

}
