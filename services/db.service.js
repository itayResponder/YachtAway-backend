const MongoClient = require('mongodb').MongoClient;
// &maxIdleTimeMS= 1000 * 60 * 5 -> 5 min
const url = `mongodb+srv://itay:bqgsldL9r0tVYpLJ@cluster0-ipcos.mongodb.net/test?retryWrites=true&w=majority&maxIdleTimeMS=300000`
module.exports = {
    connect,
    getCollection
}

// Database Name
const dbName = 'yachts_db';
var dbConn = null;
function connect() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;
    return MongoClient.connect(url, { useNewUrlParser: true })
        .then(client => {
            console.log('Connected to MongoDB');
            // If we get disconnected (e.g. db is down)
            client.on('close', () => {
                console.log('MongoDB Diconnected!');
                client.close()
                dbConn = null;
            })
            dbConn = client.db(dbName)
            return dbConn;
        })

}
async function connect2() {
    if (dbConn) {
        return dbConn;
    }
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true });
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