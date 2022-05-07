const express = require('express');
const router = express.Router();

const { User } = require('../user')

router.post('/', async (req, res) => {
<<<<<<< HEAD
=======

>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
    try {
        const user = await User.findOne({
            userName: req.body.userName,
            password: req.body.password
        });
        if (!user) {
            throw new Error("User Not Found")
        }
<<<<<<< HEAD
        const token = user.generateAuthToken(user._id, user.userName, user.email);
        res.status(201).send({ token, email: user.email });
=======
        const token = user.generateAuthToken(user._id, user.userName);
        res.status(201).send({ token });
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = {
    authRouter: router
}
