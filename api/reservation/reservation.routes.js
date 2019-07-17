// something
const express = require('express')
const router = express.Router()
const { add } = require('./reservation.controller')




router.post('/', add)
module.exports = router