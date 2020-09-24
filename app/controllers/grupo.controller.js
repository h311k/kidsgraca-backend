const security = require('../util/security')
const Grupo = require('../models/grupo.model')

exports.getUserGroups = (req, res, next) =>  {
    security.validateJWT(req, res, data => {
        findUserGrups(next, data, callback => {
            res.send(callback)
        })
    })
}

var findUserGrups = (next, data, callback) => {
    console.log(data.payload.membroDe)
    Grupo.find().where('_id').in(data.payload.membroDe).exec((err, grupos) => {
        err ? next(err) : callback({userGroups: grupos})
    })
}

