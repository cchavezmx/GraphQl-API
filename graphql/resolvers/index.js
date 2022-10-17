const { Article, Owner, Proyecto } = require('../../models')

module.exports = {

  articles: async () => {
    try {
       const articlesFetched = await Article.find()
        return articlesFetched.map(article => {
            return { 
                ...article._doc, 
                _id: article.id, 
                createdAt: new Date(article._doc.createdAt).toISOString() }
        })
    }
    catch (error) {
        throw error
    }
    
 },

  createArticle: async args => {
  try {
    const { title, body } = args.article
    const article = new Article({
        title,
        body
    })
    const newArticle = await article.save()
    return { ...newArticle._doc, _id: newArticle.id }
  }
  catch (error) {
      throw error
  }

 },

  owners: async () => {
    try {
       const ownersFetched = await Owner.find()
        return ownersFetched.map(owner => {
            return { 
                ...owner._doc, 
                _id: owner.id, 
                createdAt: new Date(owner._doc.createdAt).toISOString() }
        })
    }
    catch (error) {
        throw error
    }
    
 },
    createOwner: async args => {
        try {
            const { isActive, name, slug, rfc, razonSocial } = args.owner
            const owner = new Owner({
                isActive,
                name,
                slug,
                rfc,
                razonSocial
            })
            const newOwner = await owner.save()
            return { ...newOwner._doc, _id: newOwner.id }
        }
        catch (error) {
            throw error
        }
    },
    getOwnersBySlug: async args => {
        try {
            const { slug } = args
            const owner = await Owner.findOne({ slug })
            return { ...owner._doc, _id: owner.id }
        }
        catch (error) {
            throw error
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
        }
        catch (error) {
            throw error
        }
    },
    getProyectosByOwner: async args => {
        try {
            const { owner } = args
            const proyectos = await Proyecto.find({ owner })
            return proyectos.map(proyecto => {
                return {
                    ...proyecto._doc,
                    _id: proyecto.id
                }
            })
        }
        catch (error) {
            throw error
        }
    }
}