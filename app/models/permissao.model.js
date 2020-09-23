const mongoose = require('mongoose')

const Schema = mongoose.Schema

const permissao = new Schema({
    nome: {type: String, required: true, max: 120},
    descricao: {type: String, required: true, max: 240},
})

module.exports = mongoose.model('Permissoes', permissao)