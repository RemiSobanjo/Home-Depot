const express = require("express");
const router = express.Router();

const contactModel = require("../models/contacts.js");
const {contactUsMsg} = require("../utils/emails/contact.js");

router.post("/enquiry", async(req, res) => {
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

   
    return res.status(201).json({
        msg: "Thank you for contacting us, we will get back to you shortly.",
        //data:  saveMsg
    })
});

module.exports = router;