const express = require('express')
const router = express.Router()
const controller = require('../controllers/usuario.controller')

router.post('/create', controller.create)
router.post('/login', controller.auth)

module.exports = router