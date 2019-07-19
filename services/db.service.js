const MongoClient = require('mongodb').MongoClient;
// &maxIdleTimeMS=1200000 -> 2 Hours
const uri = `mongodb+srv://itay:bqgsldL9r0tVYpLJ@cluster0-ipcos.mongodb.net/test?retryWrites=true&w=majority&maxIdleTimeMS=60000`
module.exports = {
    connect,
    getCollection
}

// Database Name
const dbName = 'yachts_db';
var dbConn = null;
async function connect() {
    if (dbConn) {
        return dbConn;
    } 
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