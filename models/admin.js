const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
    dateOfCreate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
adminSchema.plugin(passportLocalMongoose);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;