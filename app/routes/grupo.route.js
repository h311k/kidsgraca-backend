const express = require('express')
const router = express.Router()
const controller = require('../controllers/grupo.controller')

router.post('/getUserGroups', controller.getUserGroups)

module.exports = router