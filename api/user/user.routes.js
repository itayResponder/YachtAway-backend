const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const { getUserReservations, getUserLikedYachts, updateUserIsOwner, getUsers, deleteUser, login, logout, sendMsg, updateLikedYachts, sendMsgToUser } = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', requireAuth, getUsers)
router.get('/', getUserLikedYachts)
router.get('/:id', getUserReservations)
router.put('/updateLikedYachts', updateLikedYachts)
router.put('/sendMsg', sendMsg)
router.put('/sendMsgToUser', sendMsgToUser)
router.put('/:id', updateUserIsOwner)
router.delete('/:id', requireAuth, deleteUser)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router