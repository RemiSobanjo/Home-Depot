const express = require("express");
const contactRouter = require("../routes/contacts.js");
const authRouter = require("../routes/users.js");
const StatusCode = require("../utils/StatusCode.js");

require("dotenv").config();

module.exports = (app) => {
    //set cors
    app.use((req, res, next) =>{
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
        );

        if(req.method === "OPTIONS"){
            res.header("Access-Control-Allow-Methods", "PUT, GET, PATCH, DELETE");
            return res.status(StatusCode.OK).json({});
        }

        next();
    });

    app.use(express.urlencoded({extended: true}));
    app.use(express.json({limit: '100mb'}));

    const version = process.env.VERSION;

    console.log(version)

    app.use(`${version}/contacts`, contactRouter);
    app.use(`${version}/auth`, authRouter);


    app.get("/", (req, res, next) => {
        res.json({
            status: true,
            message: "HOME-DEPOT-V1 health check passed ✅"
         });
    });
}