const yachtService = require('./yacht.service')

async function getYacht(req, res) {
    const yacht = await yachtService.getById(req.params.id)
    res.send(yacht)
}
  
const getYachts = async (req, res) => {
    const yachts = await yachtService.query()
    res.send(yachts)
}

async function updateYacht(req, res) {
    const yacht = await yachtService.update(req.body)
    res.send(yacht)
}

async function deleteYacht(req, res) {
    await yachtService.remove(req.params.id)
    res.send({})
}

async function add(req, res) {
    const yacht = await yachtService.add(req.body)
    res.send(yacht)
}

module.exports = {
    getYacht,
    getYachts,
    deleteYacht,
    updateYacht,
    add
}