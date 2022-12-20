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
    address: String
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
    cliente: ID
    name: String
    email: String
    lote: String!
    manzana: String!
    fraccionamiento: String
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
    name: String
    phone: String
    address: String
    email: String
  }

  type Pago {
    _id: ID!
    isActive: Boolean
    status: Boolean
    folio: String!
    consecutivo: String
    refPago: String!
    monto: Float!
    ctaBancaria: String
    banco: String
    tipoPago: String
    fechaPago: String
    refBanco: String
    clienteData: Client
    proyectoData: Proyecto
    loteData: Lote
    ownerData: Owner
    description: String
    isPaid: Boolean
  }


  type Lote {
    _id: ID!
    isActive: Boolean    
    manzana: String
    lote: String
    fraccionamiento: String
    precioTotal: Float!
    enganche: Float!
    financiamiento: Float!
    plazo: Float!
    mensualidad: Float!
    inicioContrato: String!
    clienteData: Client
    proyectoData: Proyecto
  }

  input PagoInput {
    isActive: Boolean
    status: Boolean
    folio: String
    consecutivo: String
    refPago: String!
    monto: Float!
    ctaBancaria: String
    banco: String
    tipoPago: String
    fechaPago: String
    refBanco: String
    cliente: ID!
    proyecto: ID!
    lote: ID!
    owner: ID
    description: String
  }

  type Pokemones {
    name: String
    url: String    
  }

  input catalogoInput {
    url: String
    name: String
  }

  type Catalogos {
    _id: ID!
    name: String
    url: String
  }
  
  
  type Query {
    owners: [Owner!]
    getOwnersBySlug(slug: String!): Owner!
    getProyectosByOwner(owner: ID!): [Proyecto!]
    getAllClients: [Client!]
    getLotesByProject(proyecto: ID!): [Lote!]
    getAllPagosFromLote(lote: ID!, proyecto: ID!, cliente: ID!): [Pago!]
    watchLoteInfo(lote: String, manzana: String, fraccionamiento: String, proyectoId: ID): [Lote!]
    getAllExperimentalFromArray: [String]
    testStackClass: Pokemones
    getAllCatalogos: [Catalogos]
  }

  type Mutation {
    createOwner(owner:OwnerInput): Owner
    createProyecto(proyecto:ProyectoInput): Proyecto
    createClient(client:ClientInput): Client
    createPDF(pago: ID!): String
    createLote(lote:LoteInput, newClientUpsert: Boolean!): Lote
    createPago(pago: PagoInput): Pago
    saveExpermientalList(busqueda: String, user: String): String
    pagarPago(pago: ID!): Pago
    uploadFileCatalogo(catalogo: catalogoInput): String
  }
  
`
