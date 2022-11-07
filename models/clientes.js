import mongoose from 'mongoose'
const { Schema } = mongoose

const ClientesSchema = new Schema({
  isActive: {
    type: Boolean,
    default: true
  },
  name: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  identifier: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  }
}, { timestamps: true })

const Clientes = mongoose.model('Cliente', ClientesSchema)

export default Clientes
