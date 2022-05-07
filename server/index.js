const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const { userRouter } = require('./user');
const { todoRouter } = require('./todo');
const { authRouter } = require('./auth');
<<<<<<< HEAD
const { sendMailRouter } = require('./nodemail');
=======
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);
app.use('/api/auth', authRouter);
<<<<<<< HEAD
app.use('/api/sendemail', sendMailRouter);
=======
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
    console.info(`App Running on Port ${PORT}`)
    try {
<<<<<<< HEAD
        mongoose.connect(`mongodb+srv://Surya:Surya@cluster0.qqdy1.mongodb.net/Todo?retryWrites=true
=======
        mongoose.connect(`mongodb+srv://Surya:Surya@cluster0.qqdy1.mongodb.net/Todos?retryWrites=true
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
        `, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection Made Successfully");
    }
    catch (error) {
        console.log(error.message);
    }
});