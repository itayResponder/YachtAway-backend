// something
const express = require('express')
const router = express.Router()
const { add, getReservations } = require('./reservation.controller')

router.post('/', add)
router.get('/', getReservations)
module.exports = router