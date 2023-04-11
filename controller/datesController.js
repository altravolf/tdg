const date = require("date-and-time");
const Dates = require("../models/dates");
const Account = require("../models/accounts");

// * To show all daybooks
module.exports.showDates = async (req, res) => {
    // adding current date value to form
    const now = new Date();
    const currDate = date.format(now, "YYYY-MM-DD")

    const dates = await Dates.find({}).sort({ date: -1 }).limit(50).populate("admin");

    res.render("dates/show", { dates, currDate });
}

// * To show Table
module.exports.table = async (req, res) => {
    const { id } = req.params;
    const date = await Dates.findById(id).populate({
        path: "accounts", populate: {
            path: "admin"
        }
    }).populate("admin")
    const accounts = date.accounts;
    // * logic to prevent empty table from showing
    if (accounts.length !== 0) {
        return res.render("accounts/table", { id, accounts, date });
    } else {
        res.redirect(`/dates/${id}/create`);
    }
}

// * to create Date Entries
module.exports.createDate = async (req, res) => {
    const now = new Date();
    const currDate = date.format(now, "YYYY-MM-DD")
    const inputDate = req.body.date;
    const existingDate = await Dates.findOne({ date: inputDate })

    // * if date already exist if not then submit if || if no date is entered add current date
    if (!inputDate) {
        throw new AppError("400", "Kya kar rhe ho yrr");
    }
    if (inputDate > currDate) {
        req.flash("error", "You cannot add futute daybook dates");
        return res.redirect("/dates");
    } else if (inputDate && existingDate === null || inputDate !== existingDate.date) {
        const dates = new Dates(req.body);
        dates.admin = req.user._id;
        await dates.save();
        req.flash("success", "Daybook created successfully!")
        return res.redirect("/dates");
    } else {
        req.flash("error", "Daybook already exist");
        return res.redirect("/dates");
    }
}

// * To delete date entries
module.exports.deleteDate = async (req, res) => {
    const { id } = req.params;
    const date = await Dates.findByIdAndDelete(id);
    // * delete day entries with date
    if (date.accounts.length) {
        await Account.deleteMany({ _id: { $in: date.accounts } })
    }
    req.flash("success", "Daybook deleted successfully!")
    res.redirect("/dates");
}