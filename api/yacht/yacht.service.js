const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
}

async function query(owner = {}) {
    const criteria = {};
    // get yachts by user logged in
    if(owner._id) {
        criteria['owner._id'] = ObjectId(owner._id)
    }
    const collection = await dbService.getCollection('yacht')
    try {
        const yachts = await collection.find(criteria).toArray();
        return yachts
    } catch (err) {
        logger.error('ERROR: cannot find yachts')
        throw err;
    }
}

async function getById(yachtId) {
    const collection = await dbService.getCollection('yacht')
    try {
        const yacht = await collection.findOne({ "_id": ObjectId(yachtId) })
        return yacht
    } catch (err) {
        logger.error(`ERROR: while finding yacht ${yachtId}`)
        throw err;
    }
}

async function remove(yachtId) {
    const collection = await dbService.getCollection('yacht')
    try {
        await collection.deleteOne({ "_id": ObjectId(yachtId) })
    } catch (err) {
        logger.error(`ERROR: cannot remove yacht ${yachtId}`)
        throw err;
    }
}

async function update(yacht) {
    const collection = await dbService.getCollection('yacht')
    try {
        const strId = yacht._id;
        const _id = new ObjectId(strId);
        yacht._id = _id;
        await collection.updateOne({ _id }, { $set: yacht })
        return yacht
    } catch (err) {
        logger.error(`ERROR: cannot update yacht ${yacht._id}`)
        throw err;
    }
}

async function add(yacht) {
    const collection = await dbService.getCollection('yacht')
    try {
        await collection.insertOne(yacht);
        return yacht;
    } catch (err) {
        logger.error(`ERROR: cannot insert yacht`)
        throw err;
    }
}