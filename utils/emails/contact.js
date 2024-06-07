const nodemailer = require("nodemailer");
require("dotenv").config();

exports.contactUsMsg = async(email, first_name, subject) => {
    const salutation = function(){
        if(first_name){
            return `Dear ${first_name}`
        }
        else{
            return "Hi"
        }
    }

    console.log(salutation());
    try{
        var smtpConfig = {
            service: process.env.SERVICE,
            host: process.env.HOST,
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.MAILER,
                pass: process.env.PASSMAILER,
            },
            tls : { rejectUnauthorized: false }
        };

        const transporter = nodemailer.createTransport(smtpConfig); 

        await transporter.sendMail({
            from: process.env.MAILER,
            to: email,
            subject: subject,
            html: `<b> ${salutation()}</b></br>
            <p>
                We received your mail. We are working on it and 
                <br /> 
                will contact you as soon as possible
            </p>`
        });
        console.log("email sent successfully");
    } catch(error){
        console.log(error, "email not sent");
    }
};