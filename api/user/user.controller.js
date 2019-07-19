const userService = require('./user.service')

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    login,
    logout,
    setFavorite,
    sendMsg
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

async function sendMsg(req, res) {
    try {
        const sendMsg = await userService.sendReservationToOwner(req.body)
        res.send(sendMsg);
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

async function setFavorite(req, res) {
    try {
        const user = await userService.getById(req.body.userId)
        delete req.body.userId
        user.likedYachts.push(req.body)
        const updatedUser = await userService.update(user)
        res.send(updatedUser)
    }
    catch (err) {
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