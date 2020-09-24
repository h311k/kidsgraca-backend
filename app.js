const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const mongoose = require('mongoose')

// Importar abaixo dessa linha as rotas.
const usuario = require('./app/routes/usuario.route')
const setup = require('./app/routes/setup.route')
const grupo = require('./app/routes/grupo.route')

// Lendo o arquivo de configuracoes...
const conf = JSON.parse(fs.readFileSync('config/app.conf'))

// Armazena a chave de encriptacao do Crypto-JS
chave = conf.chaveEncriptacaoSenhaUsuario

// Armazena a chave do JWT
chaveJWT = conf.chaveJWT

// Armazena o tempo de expiracao do JWT
expiracaoJWT = conf.expiracaoJWT

// Abre o pool de conexao
mongoose.connect(conf.dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB'))

const app = express()

// Habilitando o CORS
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Associar aqui a URI a rota
app.use('/usuario', usuario)
app.use('/setup', setup)
app.use('/grupo', grupo)

// Aponta o diretorio de estaticos
app.use(express.static('./app/public'))

// Inicia a API
app.listen(8080, () => {
    console.log('Aplicação em execução.')
})