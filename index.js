const express = require("express");
const {notFound, errorHandler} = require("./middlewares/handler");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

require("./operations/routes")(app);
//require("./operations/db")(app);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>{
    console.log("HomeDepot app is listening on port:" + PORT)
})