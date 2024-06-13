const nodemailer = require("nodemailer");
const {PASSMAILER, MAILER, SERVICE, HOST} = require("../../config/envConfig");

exports.userSignUpMsg = async (email, first_name) => {
    
};

exports.signUpOtp = async (email, OTP) => {
    console.log(email, PASSMAILER);
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
            subject: "OTP SENT",
            html: `<b> Hello, </b></br>
            <p>
                We were notified that you needed a token.
                <br /> 
                Here's your 6-digit magic number ${OTP}
                <br />
                Best Regards
            </p>`
        });
        console.log("email sent successfully");
    } catch(error){
        console.log(error, "email not sent");
    }
};
