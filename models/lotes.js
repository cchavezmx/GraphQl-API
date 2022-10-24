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
    required: true,
    unique: true
  },
  manzana: {
    type: String,
    required: false
  },
  precioTotal: {
    type: Number,
    require: true
  },
  enganche: {
    type: Number,
    required: false
  },
  financiamiento: {
    type: Number,
    required: false
  },
  plazo: {
    type: Number,
    required: true
  },
  mensualidad: {
    type: Number,
    required: false
  },
  inicioContrato: {
    type: Date,
    required: false
  }

})

const Lotes = mongoose.model('Lotes', LotesSchema)

export default Lotes
