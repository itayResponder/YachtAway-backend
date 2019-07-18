const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://itay:12345@cluster0-ipcos.mongodb.net/test?retryWrites=true&w=majority`
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
        const client = await MongoClient.connect(uri, { useNewUrlParser: true });
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