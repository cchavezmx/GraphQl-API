const moongose = require('mongoose');
const { Schema } = moongose;

const OwnerSchema = new Schema({
  isActive: {
    type: Boolean,
    default: true,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
  },
  rfc: {
    type: String,
    required: true,
  },
  razonSocial: {
    type: String,
    required: true,
  }
}, { timestamps: true });


const Owner = moongose.model('Owner', OwnerSchema);

module.exports = {
  Owner
}