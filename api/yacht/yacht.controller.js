const yachtService = require('./yacht.service')

module.exports = {
    getYacht,
    getYachts,
    deleteYacht,
    updateYacht,
    add,
    getYachtsByOwner
}

async function getYachtsByOwner(req, res) {
    try {
        const yachtsByOwner = await yachtService.queryByOwner(req.params.id)
        // console.log('yachtByOwner in yachtController in the backend =  ',yachtsByOwner)
        res.send(yachtsByOwner)
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

async function getYacht(req, res) {
    try {
        const yacht = await yachtService.getById(req.params.id)
        res.send(yacht)
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

async function getYachts(req, res) {
    try {
        const yachts = await yachtService.query(req.query)
        res.send(yachts)
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

async function updateYacht(req, res) {
    try {
        const yacht = await yachtService.update(req.body)
        res.send(yacht)
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

async function deleteYacht(req, res) {
    try {
        await yachtService.remove(req.params.id)
        res.send({ msg: 'yacht has deleted' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

async function add(req, res) {
    try {
        const yacht = await yachtService.add(req.body)
        res.send(yacht)
    } catch (err) {
        res.status(500).send({ error: err })
    }
}