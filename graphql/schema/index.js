// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
    
  type Owner {
    _id: ID!
    isActive: Boolean
    name: String!
    slug: String!
    rfc: String!
    razonSocial: String!
  }

  type Proyecto {
    _id: ID!
    isActive: Boolean
    address: String!
    title: String!
    img: String
    owner: Owner!
  }

  input ProyectoInput {
    isActive: Boolean
    address: String!
    title: String!
    img: String
    owner: ID!
  }
      
  input OwnerInput {
    isActive: Boolean
    name: String!
    slug: String!
    rfc: String!
    razonSocial: String!
  }

  input ClientInput {
    isActive: Boolean
    name: String!
    phone: String!
    address: String!
    email: String!      
  }

  input LoteInput {
    isActive: Boolean
    proyecto: ID!
    cliente: ID!
    lote: String!
    manzana: String!
    precioTotal: Float!
    enganche: Float!
    financiamiento: Float!
    plazo: Float!
    mensualidad: Float!
    inicioContrato: String!
  }

  type Lote {
    isActive: Boolean
    proyecto: ID!
    cliente: ID!
    lote: String!
    manzana: String!
    precioTotal: Float!
    enganche: Float!
    financiamiento: Float!
    plazo: Float!
    mensualidad: Float!
    inicioContrato: String!
  }

  type Client {
    _id: ID!
    isActive: Boolean
    name: String!
    phone: String!
    address: String!
    email: String!
  }


  type Lote {
    _id: ID!
    isActive: Boolean    
    manzana: String!
    lote: String!
    precioTotal: Float!
    enganche: Float!
    financiamiento: Float!
    plazo: Float!
    mensualidad: Float!
    inicioContrato: String!
    clienteData: Client! 
  }
  
  type Query {
    owners: [Owner!]
    getOwnersBySlug(slug: String!): Owner!
    getProyectosByOwner(owner: ID!): [Proyecto!]
    getAllClients: [Client!]
    getLotesByProject(proyecto: ID!): [Lote!]
  }

  type Mutation {
    createOwner(owner:OwnerInput): Owner
    createProyecto(proyecto:ProyectoInput): Proyecto
    createClient(client:ClientInput): Client
    createPDF(pago: ID!): String
    createLote(lote:LoteInput): Lote
  }
  
`
