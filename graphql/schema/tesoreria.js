export const typesDefsTesoreria = `#graphql

    input ComprobanteInput {
        concepto: String!
        obra: String!
        uuid: String!
        internalId: String!
        total: String!
        subtotal: String!
        impuestos: String!
        facturaFolio: String!
        proovedor: String!
        facturaDate: String!
        metodoPago: String!
        pdf: String!
        xml: String!
    }

    input reembolsoInput {
        finalDate: String!
        initialDate: String!
        owner: String!
        comprobantes: [ComprobanteInput]
    }

    type Mutation {
        saveReembolsoPeriodo(reembolso: reembolsoInput): ID!
    }

`
