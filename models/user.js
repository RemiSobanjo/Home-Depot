const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: { type: String },
    password: { type: String },
    created_at: { type: Date },
});

module.exports = mongoose.model("users", userSchema);