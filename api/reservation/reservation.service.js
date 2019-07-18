const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    add,
    query
}

async function query(filterBy = {}) {
    const criteria = {};
    if (filterBy.userId) {
        criteria['user._id'] = ObjectId(filterBy.userId)
    }
    const collection = await dbService.getCollection('reservation')
    try {
        const reservations = await collection.find(criteria).toArray();
        return reservations;
    } catch (err) {
        logger.error(`ERROR: cannot get reservations`)
        throw err;
    }
}

async function add(reservation) {
    const collection = await dbService.getCollection('reservation')
    try {
        await collection.insertOne(reservation)
        return reservation;
    } catch (err) {
        logger.error(`ERROR: cannot insert reservation`)
        throw err;
    }
}