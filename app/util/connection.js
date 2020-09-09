const mongoose = require('mongoose')

/**
 * Fabrica de conexao com o banco.
 */
exports.getConnection = () => {
    mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB'))
    return db
}