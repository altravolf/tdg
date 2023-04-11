const Dates = require("../models/dates");
const Account = require("../models/accounts");


const isDateAdmin = async (req, res, next) => {
    const { id } = req.params;
    const date = await Dates.findById(id);

    const accountId = req.params.accountId;
    const account = await Account.findById(accountId);
    if (!date.admin.equals(req.user._id)) {
        req.flash("error", "This action is not allowed");
        return res.redirect("/dates");

    }
    next();
}

module.exports = isDateAdmin;