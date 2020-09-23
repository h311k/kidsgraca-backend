const security = require('../util/security')
const Usuario = require('../models/usuario.model')

exports.create = (req, res, next) => {
    verificaUsuarioExistente(req, next, (callback) => {
        callback ? res.status(callback.status).send(callback.mensagem) : save(req, res)
    })
}

var save = (req, res) => {
    let usuario = new Usuario({
        email: req.body.email,
        senha: security.encrypt(req.body.senha),
        dataCriacao: new Date
    })
    usuario.save((err) => {
        err ? next(err) : res.send('Registo de usuário criado com sucesso')
    })
}

var verificaUsuarioExistente = (req, next, callback) => {
    Usuario.findOne({
        'email': req.body.email,
    },'email',
    (err, usuario) => {
        err ? next(err) : usuario ? callback({status:500, mensagem: 'Este email já está em uso'}) : callback()
    })
}