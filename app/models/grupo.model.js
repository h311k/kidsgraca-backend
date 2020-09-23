const mongoose = require('mongoose')

const Schema = mongoose.Schema

const grupo = new Schema({
    nome: {type: String, required: true, max: 120},
    idGrupoPai: {type: String, required: false, max: 120},
    permissoes: {type: Array, default:[]}
})

module.exports = mongoose.model('Grupos', grupo)