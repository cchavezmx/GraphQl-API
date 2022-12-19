import mongoose from 'mongoose'
const { Schema } = mongoose

const CatalogoPdfSchema = new Schema({
  name: {
    type: String
  },
  url: {
    type: String
  }
}, { timestamps: true })

const CatalogoPdf = mongoose.model('catalogopdf', CatalogoPdfSchema)

export default CatalogoPdf
