const mongoose = require('mongoose')

const Schema = mongoose.Schema


const artcleSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    }

}, { timestamps: true })


const Article = mongoose.model('Articles', artcleSchema)


module.exports = {
  Article
}