import mongoose from 'mongoose'
import { uuid } from 'uuidv4'

const { Schema } = mongoose

/**
* tipos de pago
* @params normal string de pago mensualidad
* @params extra string de pago extra
* @params acreditado string de pago acreditado
* @params saldoinicial string de pago de saldo inicial
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
    ref: 'Cliente'
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto'
  },
  lote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lotes'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner'
  },
  // folio es el numero de pago
  folio: {
    type: String
  },
  // folio interno para control de pagos
  consecutivo: {
    type: String
  },
  refPago: {
    type: String,
    require: false
  },
  monto: {
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
    enum: ['mensualidad', 'extra', 'acreditado', 'saldoinicial'],
    required: true
  },
  fechaPago: {
    type: Date,
    require: false
  },
  refBanco: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  isPaid: {
    type: Boolean,
    default: false
  }

}, { timestamps: true })

PagosSchema.pre('save', async function (next) {
  this.folio = await Pagos.find({
    cliente: this.cliente,
    proyecto: this.proyecto,
    lote: this.lote
  }).sort({ createdAt: -1 }).limit(1).then((data) => {
    if (data.length > 0) {
      return Number(data[0].folio) + 1
    } else {
      return 1
    }
  })

  const lastUUD = uuid().split('-')
  const lastSerie = lastUUD[4]
  this.consecutivo = lastSerie

  next()
})

const Pagos = mongoose.model('Pagos', PagosSchema)

export default Pagos
