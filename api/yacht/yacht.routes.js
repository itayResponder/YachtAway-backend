const express = require('express')
// const requireAuth = require('../../middlewares/requireAuth.middleware')
const {getYacht, getYachts, deleteYacht, updateYacht, add} = require('./yacht.controller')
const router = express.Router()
module.exports = router
// middleware that is specific to this router
// router.use(requireAuth)
// router.get('/', requireAuth, getYachts)
// router.delete('/:id',  requireAuth, deleteYacht)
router.get('/', getYachts)
router.get('/:id', getYacht)
router.delete('/:id', deleteYacht)
router.put('/:id', updateYacht)
router.post('/', add)
