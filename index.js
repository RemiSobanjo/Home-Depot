const express = require("express");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

require("./operations/routes")(app)






app.listen(PORT, () =>{
    console.log("HomeDepot app is listening on port:" + PORT)
})