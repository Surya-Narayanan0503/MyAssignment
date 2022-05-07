const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

const sendMail = (emailContent) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: 'finalprojecttesting0503@gmail.com',
            pass: 'qweasdzxc@1'
        },
        tls: {
            rejectUnAuthorized:true
        }
    });

    const mailOptions = {
        from: 'finalprojecttesting0503@gmail.com',
        to: emailContent.recieverEmailAddress,
        subject: emailContent.subject,
        text: emailContent.message
    };

    return transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            // throw error;
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


router.post('/', (req, res) => {
    try {
        sendMail({
            recieverEmailAddress: req.body.recieverEmailAddress,
            subject: req.body.subject,
            message: req.body.message,
        });
        res.status(201).send({ message: 'Successfull' });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
})

module.exports = {
    sendMailRouter : router
};