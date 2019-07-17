const reservationService = require('./reservation.service')
module.exports = {
    add,
}


async function add(req, res) {
    try {
        const reservation = await reservationService.add(req.body)
        res.send(reservation)
    } catch (err) {
        res.status(500).send({ error: err })
    }
}