const express = require('express')
// const requireAuth = require('../../middlewares/requireAuth.middleware')
const {getYacht, getYachts, deleteYacht, updateYacht, add, getYachtsByOwner} = require('./yacht.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', requireAuth, getYachts)
router.get('/', getYachts)
router.get('/:id', getYachtsByOwner)
router.get('/:id', getYacht)
// router.delete('/:id',  requireAuth, deleteYacht)
router.delete('/:id', deleteYacht)
router.put('/:id', updateYacht)
router.post('/', add)
module.exports = router