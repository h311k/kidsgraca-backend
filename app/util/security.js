const crypto = require('crypto')
const jwt = require('jsonwebtoken')

/**
 * Retorna o hash da senha passada por parametro.
 * @param {String} senha 
 */
exports.encrypt = (senha) => {
    let cipher = crypto.createCipher('aes-128-cbc', chave)
    let senhaEncriptada = cipher.update(senha, 'utf8', 'hex')
    senhaEncriptada += cipher.final('hex')
    return senhaEncriptada
}

/**
 * Retorna o token assinado com o payload passado por parametro.
 * @param {*} payload 
 * @param {*} callback 
 */
exports.signJWT = (payload) => {
    return {token: jwt.sign({payload}, chaveJWT, {expiresIn: expiracaoJWT})}
}

/**
 * Retorna o payload do token caso o mesmo esteja presente e valido.
 * @param {*} req 
 * @param {*} callback 
 */
exports.validateJWT = (req, res, callback) => {
    let token = req.headers['x-access-token']
    if(!token) res.send({ status:401, auth: false, message: 'No token provided.' })
    jwt.verify(token, chaveJWT, (err, decoded) => {
        if (err) res.send({ status:401, auth: false, message: 'Failed to authenticate token.' })
        decoded.auth = true
        callback(decoded) 
    })
}