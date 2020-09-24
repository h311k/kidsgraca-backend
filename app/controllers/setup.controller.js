const security = require('../util/security')
const Usuario = require('../models/usuario.model')
const Grupo = require('../models/grupo.model')
const Permissao = require('../models/permissao.model')
const Categoria = require('../models/categoria.model')

/**
 * Realiza a sequencia de instalacao, criando o usuario admin grupos de administrador e usuario, categorias de posts e etc.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.install = (req, res, next) => {
    let resposta = {}
    let permissoes = {}

    createBasicPermissions(next, callback => {
        resposta.criacaoPermissoes = callback
        createBasicCategory(next, callback => {
            resposta.criacaoCategoria = callback
        })
        getBasicPermissions(next, callback => {
            permissoes = callback
            // Cria o grupo de usuarios nao administradores.
            createGroup('Usuário', [permissoes[3]], next, callback => {
                resposta.cricaoGrupoUsuario = callback
            })
            // Cria o grupo de administradores
            createGroup('Administrador', permissoes, next, callback => {
                resposta.cricaoGrupoAdministrador = callback
                getGroupAdmin('Administrador', next, callback => {
                    // Cria o usuario admin e coloca ele no grupo de administradores
                    createUserAdmin(next, callback._id, callback => {
                        resposta.criacaoUsuarioAdmin = callback
                        res.send(resposta)
                    })
                })
            })
        })
    })
}

var createUserAdmin = (next, grupoAdmin, callback) => {
    let usuario = new Usuario({
        email: 'admin',
        senha: security.encrypt('admin'),
        membroDe: [grupoAdmin],
        dataCriacao: new Date
    })
    usuario.save((err) => {
        err ? next(err) : callback('Usuário admin criado com sucesso')
    })
}

var createGroup = (nome, permissoes, next, callback) => {
    let grupo = new Grupo({
        nome: nome,
        idGrupoPai: null,
        permissoes: permissoes
    })
    grupo.save((err) => {
        err ? next(err) : callback('Grupo ' + nome + ' criado com sucesso')
    })
}

var createBasicPermissions = (next, callback) => {
    let permissoes = [
        {
            nome: 'Administrador',
            descricao: 'Administrador geral da aplicação.'
        },
        {
            nome: 'Publicador',
            descricao: 'Permite publicar e remover conteúdos próprios.'
        },
        {
            nome: 'Editor',
            descricao: 'Permite editar conteúdos existentes.'
        },
        {
            nome: 'Público',
            descricao: 'Permite comentar em conteúdos publicados.'
        }
    ]
    let model = new Permissao()
    model.collection.insertMany(permissoes, response => {
        callback('Lista básica de permissões criada com sucesso.')
    })
}

var createBasicCategory = (next, callback) => {
    let categoria = new Categoria({
        nome: 'Geral'
    })
    categoria.save((err) => {
        err ? next(err) : callback('Categoria geral criada com sucesso.')
    })
}

var getBasicPermissions = (next, callback) => {
    Permissao.find({}, '_id', (err, permissoes) => {
        err ? next(err) : permissoes ? callback(permissoes) : next()
    })
}

var getGroupAdmin = (nome, next, callback) => {
    Grupo.findOne({
        'nome': nome,
    },
        (err, grupo) => {
            err ? next(err) : grupo ? callback(grupo) : next()
        })
}

// TODO: Criar categorias.