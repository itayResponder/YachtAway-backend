const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
}

async function query(filterBy = {}) {
    const criteria = {};
    // get yachts by user logged in
    if (filterBy.ownerId) {
        criteria['owner._id'] = ObjectId(filterBy.ownerId)
    }

    //get yachts by facilities
    if (filterBy.facilities) {
        var facilitiesFilter = []
        filterBy.facilities.forEach(facility => {
            facility = facility.toLowerCase()
            facilitiesFilter.push({ "facilities": facility })
        })
        criteria['$and'] =  facilitiesFilter
    }
   
    if(filterBy.txt){
    const regex = new RegExp(filterBy.txt, 'i')
    let locationFilter = [{'location.city':regex},{'location.country':regex }]
    criteria['$or'] = locationFilter
    }
    if(filterBy.minPeople){
        filterBy.minPeople = +filterBy.minPeople       
        criteria['maxPeopleOnBoard'] ={$gt:filterBy.minPeople}  
    }

    if(filterBy.sort === 'price'){
        var sortBy ={pricePerNight: -1 }
    }
    if(filterBy.sort === 'name'){
        var sortBy ={name: 1 }
    }

    const collection = await dbService.getCollection('yacht')
    try {
        if (filterBy.sort) {
            var yachts = await collection.find(criteria).sort(sortBy).toArray()
        }
        else var yachts = await collection.find(criteria).toArray()
        
        
        
        
         console.log('after the if')
         console.log('filterBy.sort',filterBy.sort)
        
        
        return yachts
    } catch (err) {
        logger.error('ERROR: cannot find owner yachts')
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
        const updatedYacht = await collection.updateOne({ "_id": ObjectId(yacht) }, { $set: yacht })
        return updatedYacht
    } catch (err) {
        logger.error(`ERROR: cannot update yacht ${yacht._id}`)
        throw err;
    }
}

async function add(yacht) {
    const collection = await dbService.getCollection('yacht')
    yacht.owner._id = ObjectId(yacht.owner._id);
    try {
        await collection.insertOne(yacht);
        return yacht;
    } catch (err) {
        logger.error(`ERROR: cannot insert yacht ${yacht}`)
        throw err;
    }
}