const nodemailer = require("nodemailer");
const {PASSMAILER, MAILER, SERVICE, HOST} = require("../../config/envConfig");

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
            service: SERVICE,
            host: HOST,
            port: 465,
            secure: true, // use SSL
            auth: {
                user: MAILER,
                pass: PASSMAILER,
            },
            tls : { rejectUnauthorized: false }
        };

        const transporter = nodemailer.createTransport(smtpConfig); 

        await transporter.sendMail({
            from: MAILER,
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