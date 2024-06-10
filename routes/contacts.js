const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts.js")


router.post("/enquiry", contactsController.contact);

module.exports = router;