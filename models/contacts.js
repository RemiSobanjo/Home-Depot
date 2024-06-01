const { plugin, mongoose } = require("mongoose");
//const { SoftDelete } = require("soft-delete-mongoose-plugin");

// //define soft delete field name
// const IS_DELETED_FIELD = "isDeleted";
// const DELETED_AT_FIELD = "deletedAt";

// //use soft delete plugin
// plugin(
//     new SoftDelete({
//         isDeletedField: IS_DELETED_FIELD,
//         deletedAtField: DELETED_AT_FIELD,
//     }).getPlugin()
// )

const contactSchema = mongoose.Schema({
    email: {type: String},
    first_name: {type: String},
    last_name: {type: String},
    phone_number: {type: String},
    subject: {type: String},
    message: {type: String},

    isDeleted: {type: Boolean, default: false},
    deletedAt: {type: Date, default: null},
}, {timestamps: true});

module.exports = mongoose.model('Contact', contactSchema);