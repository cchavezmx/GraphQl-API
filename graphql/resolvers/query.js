import { Owner, Proyecto } from '../../models/index.js'

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
  getOwnersBySlug: async args => {
    try {
      const { slug } = args
      const owner = await Owner.findOne({ slug })
      return { ...owner._doc, _id: owner.id }
    } catch (error) {

    }
  },

  getProyectosByOwner: async args => {
    try {
      const { owner } = args
      const proyectos = await Proyecto.find({ owner }).populate('owner')
      const respose = proyectos.map(proyecto => {
        return {
          ...proyecto._doc,
          _id: proyecto.id
        }
      })
      return respose
    } catch (error) {
      console.log('🚀 ~ file: index.js ~ line 110 ~ error', error)
    }
  }

}
