const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const  authMiddleware = require('../auth/middleware');

const todoSchema = new mongoose.Schema({
    title: String,
    for: String,
    date: String,
    by: String,
    done: Boolean
});

const Todo = new mongoose.model("Todo", todoSchema);

router.get('/', authMiddleware, async (req, res) => {
    try {
        let todos = await Todo.find({});
        let todoCreatedFor = req.query.for;
        let todoCreatedBy = req.query.by;

        if (todoCreatedFor) {
            todos = todos.filter(todo => todo.for === todoCreatedFor);
        }
        if (todoCreatedBy) {
            todos = todos.filter(todo => todo.by === todoCreatedBy);
        }
        res.status(200).send(todos);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        let todo = new Todo({
            title: req.body.title,
            for: req.body.for,
            date: req.body.date,
            by: req.body.by,
            done: req.body.done
        });
        let createdTodo = await todo.save();
        res.status(201).send(createdTodo);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        let updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                for: req.body.for,
                date: req.body.date,
                by: req.body.by,
                done: req.body.done
            },
            { new: true }
        );
        res.status(201).send(updatedTodo);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = {
    Todo,
    todoSchema,
    todoRouter : router
};  