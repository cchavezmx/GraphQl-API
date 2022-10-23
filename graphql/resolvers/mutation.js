import { ApolloError } from 'apollo-server-core'
import { Proyecto, Clientes, Owner } from '../../models/index.js'

export const Mutation = {
  createClient: async args => {
    try {
      const { name, phone, address, email } = args.client
      const client = new Clientes({
        name,
        phone,
        address,
        email
      })
      const newClient = await client.save()
      return { ...newClient._doc, _id: newClient.id }
    } catch (error) {
      return ApolloError(error)
    }
  },
  createProyecto: async args => {
    try {
      const { isActive, address, title, img, owner } = args.proyecto
      const proyecto = new Proyecto({
        isActive,
        address,
        title,
        img,
        owner
      })
      const newProyecto = await proyecto.save()
      return { ...newProyecto._doc, _id: newProyecto.id }
    } catch (error) {
      return ApolloError(error)
    }
  },
  createOwner: async args => {
    try {
      const { name, slug, rfc, razonSocial } = args.owner
      const owner = new Owner({
        name,
        slug,
        rfc,
        razonSocial
      })
      const newOwner = await owner.save()
      return { ...newOwner._doc, _id: newOwner.id }
    } catch (error) {
      return ApolloError(error)
    }
  }
}
