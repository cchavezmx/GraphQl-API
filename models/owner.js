import mongoose from 'mongoose'
const { Schema } = mongoose

export const OwnerSchema = new Schema({
  isActive: {
    type: Boolean,
    default: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  rfc: {
    type: String,
    required: true
  },
  razonSocial: {
    type: String,
    required: true
  }
}, { timestamps: true })

const Owner = mongoose.model('Owner', OwnerSchema)

export default Owner
