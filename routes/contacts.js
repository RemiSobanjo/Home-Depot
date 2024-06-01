const express = require("express");
const router = express.Router();

router.post("/enquiry", (req, res) => {
    console.log("Testing in progress");
});

module.exports = router;