import mongoose from 'mongoose'
const { Schema } = mongoose

const experimental = new Schema({
  value: {
    type: String

  }
}, {
  timestamps: true
})

const Experimental = mongoose.model('Experimental', experimental)
export default Experimental
