const mongoose = require("mongoose");
const Dates = require("./dates");
const Admin = require("./admin");
const { Schema } = mongoose;
const AppError = require("../utils/appError");
const { required, string } = require("joi");

const accountSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    expense: {
        type: Number,
        default: 0
    },
    income: {
        type: Number,
        default: 0
    },
    donation: {
        type: Number,
        default: 0
    },
    dateOfCreate: {
        type: Date,
        default: Date.now
    },
    date: [{
        type: Schema.Types.ObjectId,
        ref: "Date"
    }],
    admin: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    },

}, { timestamps: true })


const Account = mongoose.model("Account", accountSchema);

module.exports = Account;