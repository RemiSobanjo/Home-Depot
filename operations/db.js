//const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");

require("dotenv").config();

const db = process.env.DB_DEVELOPMENT_URL;

module.exports = (app) => {
    mongoose.set('strictQuery', false);

    mongoose
        .connect(db)
        .then(() => console.log("Home Search Depot has been connected successfully......"));

}