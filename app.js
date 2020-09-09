const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')

// Importar abaixo dessa linha as rotas.

// Lendo o arquivo de configuracoes...
const conf = JSON.parse(fs.readFileSync('config/app.conf'))

// Armazena a chave de encriptacao do Crypto-JS
chave = conf.chaveEncriptacaoSenhaUsuario

// Armazena a chave do JWT
chaveJWT = conf.chaveJWT

// Armazena a url de conexao
dbUrl = conf.dbUrl

const app = express()

// Habilitando o CORS
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Associar aqui a URI a rota

// Aponta o diretorio de estaticos
app.use(express.static('./app/public'))

// Inicia a API
app.listen(8080, () => {
    console.log('Aplicação em execução.')
})