import { ApolloError } from 'apollo-server-core'
import { Proyecto, Clientes, Owner, Lotes } from '../../models/index.js'
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
  createLote: async (_, { lote }, context, info) => {
    try {
      const newLote = new Lotes({ ...lote })
      const newLoteCreated = await newLote.save()
      return { ...newLoteCreated._doc, _id: newLoteCreated.id }
    } catch (error) {
      return new ApolloError(error)
    }
  }
}
