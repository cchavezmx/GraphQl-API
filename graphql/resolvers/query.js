import { ApolloError } from 'apollo-server-core'
import { Owner, Proyecto, Clientes, Lotes, Pagos, CatalogoPdf } from '../../models/index.js'
import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

export const Query = {

  owners: async () => {
    try {
      const ownersFetched = await Owner.find().then(res => {
        return res.map(owner => {
          return {
            ...owner._doc,
            _id: owner.id,
            createdAt: new Date(owner._doc.createdAt).toISOString()
          }
        })
      })
      return ownersFetched
    } catch (error) {
      return new ApolloError(error)
    }
  },
  getOwnersBySlug: async (_, { slug }, context, info) => {
    try {
      const owner = await Owner.findOne({ slug }).then(res => {
        return { ...owner._doc, _id: owner.id }
      })
      return owner
    } catch (error) {
      return new ApolloError(error)
    }
  },
  getProyectosByOwner: async (_, { owner }, context, info) => {
    try {
      const proyectos = await Proyecto.find({ owner }).populate('owner')
      return proyectos.map(proyecto => {
        return {
          ...proyecto._doc,
          _id: proyecto.id
        }
      })
    } catch (error) {
      return new ApolloError(error)
    }
  },
  getAllClients: async () => {
    try {
      const clients = await Clientes.find().then(res => {
        return res.map(client => {
          return {
            ...client._doc,
            _id: client.id
          }
        })
      })
      return clients
    } catch (error) {
      return new ApolloError(error)
    }
  },
  getLotesByProject: async (_, { proyecto }, context, info) => {
    const objectId = mongoose.Types.ObjectId(proyecto)
    try {
      const client = await Lotes
        .find({ proyecto: objectId })
        .populate('cliente')
        .then(res => {
          res.reverse()
          return res.map(lote => {
            return {
              ...lote._doc,
              _id: lote.id,
              clienteData: { name: lote.cliente.name, _id: lote.cliente._id }
            }
          })
        })
      return client
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
      const loteFound = await Pagos
        .aggregate(agg)
        .then((res) => {
          return res.map((pago) => {
            return {
              ...pago,
              monto: parseFloat(pago.monto)
            }
          })
        })
      return loteFound
    } catch (error) {
      return new ApolloError(error)
    }
  },
  watchLoteInfo: async (_, { lote, manzana, fraccionamiento, proyectoId }, context, info) => {
    const agg = [
      {
        $match: {
          lote
        }
      }, {
        $match: {
          manzana
        }
      }, {
        $match: {
          fraccionamiento
        }
      }, {
        $lookup: {
          from: 'proyectos',
          localField: 'proyecto',
          foreignField: '_id',
          as: 'proyectoData'
        }
      }, {
        $unwind: {
          path: '$proyectoData'
        }
      }, {
        $lookup: {
          from: 'clientes',
          localField: 'cliente',
          foreignField: '_id',
          as: 'clienteData'
        }
      }, {
        $unwind: {
          path: '$clienteData'
        }
      }, {
        $match: {
          proyecto: new ObjectId(proyectoId)
        }
      }
    ]

    const match = await Lotes.aggregate(agg).then(res => {
      return res.map(item => {
        return {
          ...item,
          _id: item._id.toString()
        }
      })
    })
    return match
  },
  getAllCatalogos: async (_, { owner }, context, info) => {
    try {
      const allCtalogos = await CatalogoPdf.find().then(res => {
        return res.map(catalogo => {
          return {
            ...catalogo._doc,
            _id: catalogo.id
          }
        })
      })
      return allCtalogos
    } catch (error) {
      return new ApolloError(error)
    }
  }
}
