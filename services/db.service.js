const MongoClient = require('mongodb').MongoClient;
const config = require('../config')

module.exports = {
    connect,
    getCollection
}

// Database Name
const dbName = 'yachts_db';
var dbConn = null;

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        logger.error(err)
        throw err;
    }
}

async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}