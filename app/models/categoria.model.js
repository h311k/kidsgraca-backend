const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categoria = new Schema({
    nome: {type: String, required: true, max: 120},
})

module.exports = mongoose.model('Categorias', categoria)