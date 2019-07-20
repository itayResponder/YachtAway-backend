const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const { getUser, getUsers, deleteUser, login, logout, setFavorite, sendMsg } = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', requireAuth, getUsers)
router.get('/:id', getUser)
router.put('/', setFavorite)
router.put('/sendMsg', sendMsg)
router.delete('/:id', requireAuth, deleteUser)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router