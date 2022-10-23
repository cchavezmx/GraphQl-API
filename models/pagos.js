import mongoose from 'mongoose'
const { Schema } = mongoose

/**
* tipos de pago
* @params normal string de pago mensualidad
* @params extra string de pago extra
* @params acreditado string de pago acreditado
*/

export const PagosSchema = new Schema({
  isActive: {
    type: Boolean,
    default: true,
    required: false
  },
  status: {
    type: Boolean,
    default: false
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cliente'
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'proyecto'
  },
  lote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lote'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'owner'
  },
  folio: {
    type: Number,
    required: true
  },
  refPago: {
    type: String,
    require: false
  },
  deposito: {
    type: mongoose.Decimal128,
    require: true
  },
  ctaBancaria: {
    type: String,
    require: false
  },
  banco: {
    type: String,
    require: false
  },
  tipoPago: {
    type: String,
    enum: ['normal', 'extra', 'acreditado'],
    required: true
  },
  fechaPago: {
    type: Date,
    require: false
  },
  refBanco: {
    type: String,
    require: true
  }

}, { timestamps: true })

PagosSchema.pre('save', async function (next) {
  this.folio = await Pagos.find({
    cliente: this.cliente,
    proyecto: this.proyecto,
    lote: this.lote,
    owner: this.owner
  }).countDocuments() + 1

  next()
})

const Pagos = mongoose.model('Pagos', PagosSchema)

export default Pagos
