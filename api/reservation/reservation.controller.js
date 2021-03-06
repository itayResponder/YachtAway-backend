const reservationService = require('./reservation.service')
module.exports = {
    add,
    getReservations
}

async function getReservations(req, res) {
    try {
        const reservations = await reservationService.query(req.query)
        res.send(reservations)
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

async function add(req, res) {
    try {
        const reservation = await reservationService.add(req.body)
        res.send(reservation)
    } catch (err) {
        res.status(500).send({ error: err })
    }
}