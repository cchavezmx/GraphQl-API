import { ApolloError } from 'apollo-server-core'
import { Proyecto, Clientes, Owner, Lotes, Pagos } from '../../models/index.js'
import createPDF from '../../utils/createPDF.js'

export const Mutation = {
  createClient: async (_, { client }, context, info) => {
    try {
      const { name, phone, address, email } = client
      const response = new Clientes({
        name,
        phone,
        address,
        email
      })
      const newClient = await response.save()
      return { ...newClient._doc, _id: newClient.id }
    } catch (error) {
      return new ApolloError(error)
    }
  },
  createProyecto: async (_, { proyecto }, context, info) => {
    try {
      const { isActive, address, title, img, owner } = proyecto
      const newProject = new Proyecto({
        isActive,
        address,
        title,
        img,
        owner
      })
      const newProyecto = await newProject.save()
      return { ...newProyecto._doc, _id: newProyecto.id }
    } catch (error) {
      return new ApolloError(error)
    }
  },
  createOwner: async (_, { owner }, context, info) => {
    try {
      const response = new Owner({ ...owner })
      const newOwner = await response.save()
      return { ...newOwner._doc, _id: newOwner.id }
    } catch (error) {
      return new ApolloError(error)
    }
  },
  createPDF: async args => {
    try {
      const res = await createPDF()
      return res
    } catch (error) {
      return new ApolloError(error)
    }
  },
  createLote: async (_, { lote, newClientUpsert }, context, info) => {
    const { name, email, cliente, ...restOfData } = lote

    try {
      const contactIsNew = await Clientes.findOne({ email })

      if (newClientUpsert && !contactIsNew) {
        const newClient = new Clientes({ name, email })
        const client = await newClient.save()
        // creamos el nuevo lote con el id del cliente generado en la linea 59
        const newLote = new Lotes({ ...restOfData, cliente: client._id })
        const newLoteCreated = await newLote.save()
        return { ...newLoteCreated._doc, _id: newLoteCreated.id }
      }

      if (!newClientUpsert) {
        // verificamos si el lote existe
        const newLote = new Lotes({ ...lote })
        const newLoteCreated = await newLote.save()
        return { ...newLoteCreated._doc, _id: newLoteCreated.id }
      }

      if (newClientUpsert && contactIsNew) {
        return new ApolloError('El cliente ya existe')
      }

      const error = new ApolloError('no se especifico si el cliente es nuevo o no')
      return error
    } catch (error) {
      return new ApolloError(error)
    }
  },
  createPago: async (_, { pago }, context, info) => {
    try {
      const newPago = new Pagos({ ...pago })
      const newPagoCreated = await newPago.save()
      console.log('🚀 ~ file: mutation.js ~ line 90 ~ createPago: ~ newPagoCreated', newPagoCreated)
      return { ...newPagoCreated._doc, _id: newPagoCreated.id }
    } catch (error) {
      return new ApolloError(error)
    }
  }

}
