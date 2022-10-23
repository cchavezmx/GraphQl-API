import mongoose from 'mongoose'
const { Schema } = mongoose

const ClientesSchema = new Schema({
  isActive: {
    type: Boolean,
    default: true
  },
  nombre: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  email: {
    type: String,
    unique: true
  }

}, { timestamps: true })

const Clientes = mongoose.model('Clientes', ClientesSchema)

export default Clientes
