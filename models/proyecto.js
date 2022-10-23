import mongoose from 'mongoose'
const { Schema } = mongoose

const ProyectoSchema = new Schema({
  isActive: {
    type: Boolean,
    default: true,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  img: {
    type: String,
    requires: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner'
  }

}, { timestamps: true })

const Proyecto = mongoose.model('Proyecto', ProyectoSchema)

export default Proyecto
