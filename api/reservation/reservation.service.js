const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    add,
}

async function add(reservation) {
    const collection = await dbService.getCollection('reservation')
    try {
        await collection.insertOne(reservation)
        return reservation
    } catch (err) {
        logger.error(`ERROR: cannot insert reservation`)
        throw err;
    }
}