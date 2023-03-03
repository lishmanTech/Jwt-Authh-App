import nodemailer from "nodemailer";
import Mailgen from "mailgen";

import ENV from "../config.js"

let nodeConfig = {
    service: 'gmail',
    //secure: false, // true for 465, false for other ports
    auth: {
        user: ENV.EMAIL, // generated gmail mail
        pass: ENV.PASSWORD, // generated email password from config
    }

    // tls: {
    //     rejectUnauthorized: false
    // }
}

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: ENV.EMAIL, // generated ethereal user
//         pass: ENV.PASSWORD, // generated ethereal password
//     },

    
// });

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    // body of the email
    var email = {
        body : {
            name: username,
            intro : text || 'Welcome onboard. Here you will learn about different formats of programming',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from : ENV.EMAIL,
        to: userEmail,
        subject : subject || "Signup Successfully",
        html : emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us."})
        })
        .catch(error => res.status(500).send({ error }))

}