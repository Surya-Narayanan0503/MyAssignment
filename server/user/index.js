const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');

const authMiddleware = require('../auth/middleware');
const router = express.Router();

const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    email: String
});

userSchema.methods.generateAuthToken = function (userId, userName, email) {
    const token = jwt.sign({ sub: userId, userName, email }, "someprivatekey");
    return token;
}

const User = new mongoose.model("User", userSchema);

router.get('/', async (req, res) => {
    try {
        let users = await User.find({});
        res.status(200).send(users);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/fetchbyname', async (req, res) => {
    try {

        let query = req.query.name.toLocaleLowerCase();
        let users = await User.find({});

        let filtered = users.filter(u => u.userName.toLowerCase().includes(query));
        res.status(200).send(filtered);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/id', authMiddleware, async (req, res) => {
    try {
        let user = await User.findById(req.params.id).exec();
        res.status(200).send(user);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.post('/', async (req, res) => {
    try {
        let user = new User({
            userName: req.body.userName,
            password: req.body.password,
            email: req.body.email
        });
        let createdUser = await user.save();
        res.status(201).send(createdUser);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = {
    User: User,
    userSchema: userSchema,
    userRouter: router
};  