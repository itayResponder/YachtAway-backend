const userService = require('./user.service')

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    login,
    logout,
    sendMsg,
    updateLikedYachts,
    sendMsgToUser,
    getUserReservations,
    updateUserIsOwner
}

async function login(req, res) {
    try {
        const user = await userService.login(req.body)
        if (user) {
            req.session.user = user;
            res.send(user);
        } else {
            res.status(401).send('User does not exist')
        }
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

async function updateUserIsOwner(req, res) {
    try {
        console.log('Server controler updateUserIsOwner req.body;', req.body)
        let foundUser = await userService.getById(req.params.id)
        foundUser.isOwner = true;
        const updatedUser = await userService.update(foundUser);
        res.send(updatedUser.isOwner);
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

async function updateLikedYachts(req, res) {
    console.log('Server controler updateLikedYachts req.body;', req.body)
    let foundUser = await userService.getById(req.body.userId)
    try {
        if (req.body.isLiked) {
            let idx = foundUser.likedYachts.findIndex(userLikedYacht => userLikedYacht._id === req.body._id)
            if (idx > -1) {
                foundUser.likedYachts.splice(idx, 1)
            }
        } else {
            delete req.body.userId
            foundUser.likedYachts.push(req.body)
        }

        let updatedUser = await userService.update(foundUser);
        res.send(updatedUser.likedYachts);
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

async function sendMsgToUser(req, res) {
    try {
        console.log('Server controler sendMsgToUser req.body;', req.body)
        const userSentMsg = await userService.getById(req.body._id)
        let msgFromOwner
        if(req.body.isReply) {
            msgFromOwner = "Your Reservation number: " + req.body.reservationId + " has been approved!"
        }  else {
            msgFromOwner = "Your Reservation number: " + req.body.reservationId + " has been declined!"
        }
        userSentMsg.reservations.unshift(msgFromOwner)
        let updatedUserMsgs = await userService.update(userSentMsg);
        res.send(updatedUserMsgs.reservations);
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

async function sendMsg(req, res) {
    try {
        console.log('Server controler req.body;', req.body)
        const sendMsg = await userService.sendReservationToOwner(req.body)
        res.send(sendMsg);
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

async function logout(req, res) {
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

async function getUserReservations(req, res) {
    try {
        console.log('Server controler getUserReservations req.body;', req.body)
        const user = await userService.getById(req.params.id)
        res.send(user.reservations)
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

async function getUsers(req, res) {
    const users = await userService.query()
    res.send(users)
}

async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.send({ msg: 'user deleted' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}