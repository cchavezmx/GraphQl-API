import mongoose from 'mongoose'

const { Schema } = mongoose

// def: cada lote solo tiene un cliente y solo puedo pertenecer a un proyecto

const LotesSchema = new Schema({
  isActive: {
    type: Boolean,
    default: true
  },
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: 'Proyecto'
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'Cliente'
  },
  lote: {
    type: String,
    unique: true
  },
  manzana: {
    type: String
  },
  fraccionamiento: {
    type: String
  },
  precioTotal: {
    type: Number
  },
  enganche: {
    type: Number
  },
  financiamiento: {
    type: Number
  },
  plazo: {
    type: Number
  },
  mensualidad: {
    type: Number
  },
  inicioContrato: {
    type: Date
  }

})

const Lotes = mongoose.model('Lotes', LotesSchema)

export default Lotes
