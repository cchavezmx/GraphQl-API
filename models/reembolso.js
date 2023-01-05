import mongoose from 'mongoose'
const { Schema } = mongoose

const ReembolsoSchema = new Schema({
  status: {
    enum: ['Pendiente', 'Aprobado', 'Rechazado', 'Cancelado', 'Atencion'],
    type: String,
    default: 'Pendiente'
  },
  owner: {
    type: String,
    required: true
  },
  finalDate: {
    type: String,
    required: true
  },
  initialDate: {
    type: String,
    required: true
  },
  comprobantes: {
    type: Array
  }
}, { timestamps: true })

const Reembolso = mongoose.model('reembolso', ReembolsoSchema)
export default Reembolso
