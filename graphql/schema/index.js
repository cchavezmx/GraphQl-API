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
  }

  type Mutation {
    createArticle(article:ArticleInput): Article
    createOwner(owner:OwnerInput): Owner
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)