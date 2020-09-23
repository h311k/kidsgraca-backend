const express = require('express')
const router = express.Router()
const controller = require('../controllers/setup.controller')

router.post('/install', controller.install)

module.exports = router