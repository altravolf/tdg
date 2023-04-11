const { date } = require("joi");
const mongoose = require("mongoose");
const Account = require("./accounts");
const Admin = require("./admin");
const { Schema } = mongoose;

let dateSchema = new Schema({
    date: {
        type: String,
    },
    dateOfCreate: {
        type: Date,
        default: Date.now
    },
    accounts: [{
        type: Schema.Types.ObjectId,
        ref: "Account"
    }],
    admin: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    }
}, { timestamps: true })

const Dates = mongoose.model("date", dateSchema);



module.exports = Dates;