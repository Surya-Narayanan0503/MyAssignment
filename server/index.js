const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const { userRouter } = require('./user');
const { todoRouter } = require('./todo');
const { authRouter } = require('./auth');
const { sendMailRouter } = require('./nodemail');


app.use('/', express.static(__dirname +'/public/'))
app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);
app.use('/api/auth', authRouter);
app.use('/api/sendemail', sendMailRouter);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
    console.info(`App Running on Port ${PORT}`)
    try {
        mongoose.connect(`mongodb+srv://Surya:Surya@cluster0.qqdy1.mongodb.net/Todo?retryWrites=true
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
