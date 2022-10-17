const { buildSchema } = require('graphql')


module.exports = buildSchema(`
  type Article {
    _id: ID!
    title: String!
    body: String!
    createdAt: String!
  }

  input ArticleInput {
    title: String!
    body: String!
  }
  
  type Owner {
    _id: ID!
    isActive: Boolean!
    name: String!
    slug: String!
    rfc: String!
    razonSocial: String!
  }

  type Proyecto {
    _id: ID!
    isActive: Boolean!
    address: String!
    title: String!
    img: String
    owner: Owner!
  }

  input ProyectoInput {
    isActive: Boolean!
    address: String!
    title: String!
    img: String
    owner: ID!
  }
      
  input OwnerInput {
    isActive: Boolean!
    name: String!
    slug: String!
    rfc: String!
    razonSocial: String!
  }
  
  type Query {
    articles:[Article!]
    owners: [Owner!]
    getOwnersBySlug(slug: String!): Owner!
    getProyectosByOwner(owner: ID!): [Proyecto!]
  }

  type Mutation {
    createArticle(article:ArticleInput): Article
    createOwner(owner:OwnerInput): Owner
    createProyecto(proyecto:ProyectoInput): Proyecto
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)