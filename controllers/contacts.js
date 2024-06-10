const contactModel = require("../models/contacts.js");
const {contactUsMsg} = require("../utils/emails/contact.js");


const contact = async(req, res, next) => {
   // try{
            const {first_name, last_name, email, phone_number, subject, message} = req.body

            const contactObj = {
                first_name, 
                last_name, 
                email, 
                phone_number, 
                subject, 
                message,
            }
   
            const saveMsg = await contactModel.create(contactObj);

            //send mail message
            await contactUsMsg(email, first_name, subject)

    
            return res.status(200).json({
                msg: "Thank you for contacting us, we will get back to you shortly.",
                data:  saveMsg
            })
    // }catch(error){
    //     console.log("Critical Error : " + error);

    //     next();
    // }
}

module.exports = {contact}