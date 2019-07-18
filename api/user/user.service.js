
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add,
    login
}

async function query(filterBy = {}) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.name = filterBy.txt
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }

    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find(criteria).toArray();
        return users
    } catch (err) {
        logger.error('Cannot find users')
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ "_id": ObjectId(userId) })
        return user
    } catch (err) {
        logger.error(`While finding user ${userId}`)
        throw err;
    }
}
async function getByEmail(email) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        logger.error(`While finding user ${email}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.remove({ "_id": ObjectId(userId) })
    } catch (err) {
        logger.error(`Cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.replaceOne({ "_id": ObjectId(user._id) }, { $set: user })
        console.log('last stop ', user)
        return user
    } catch (err) {
        logger.error(`Cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        logger.error(`Cannot insert user`)
        throw err;
    }
}

async function login(user) {
    const collection = await dbService.getCollection('user')
    try {
        const foundUser = await collection.findOne(user);
        if (foundUser) {
            user._id = foundUser._id;
            user.firstName = foundUser.firstName;
            user.isAdmin = foundUser.isAdmin;
            delete user.password;
            delete user.email;
            return user;
        }
        else return foundUser;
    } catch (err) {
        logger.error('Cannot login')
        throw err;
    }
}