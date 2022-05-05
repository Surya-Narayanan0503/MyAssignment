const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const { userRouter } = require('./user');
const { todoRouter } = require('./todo');
const { authRouter } = require('./auth');

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
    console.info(`App Running on Port ${PORT}`)
    try {
<<<<<<< HEAD
        mongoose.connect(`mongodb://localhost/Todos`, {
=======
        mongoose.connect(`mongodb+srv://Surya:Surya@cluster0.qqdy1.mongodb.net/Todos?retryWrites=true
        `, {
>>>>>>> 87eb13aeba4898fa9a33c26ae051313613bc9b0e
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection Made Successfully");
    }
    catch (error) {
        console.log(error.message);
    }
<<<<<<< HEAD
});
=======
});
>>>>>>> 87eb13aeba4898fa9a33c26ae051313613bc9b0e
