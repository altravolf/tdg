const Dates = require("../models/dates");
const Account = require("../models/accounts");

module.exports.showExpense = async (req, res) => {
    const { id } = req.params;
    res.render("accounts/expense", { id });
}

module.exports.showIncome = async (req, res) => {
    const { id } = req.params;
    res.render("accounts/income", { id });
}

module.exports.showDonation = async (req, res) => {
    const { id } = req.params;
    res.render("accounts/donation", { id });
}

module.exports.showCreate = async (req, res) => {
    const { id } = req.params;
    res.render("accounts/accountNew", { id });
}

module.exports.createEntry = async (req, res) => {
    const { id } = req.params;
    const date = await Dates.findById(id);
    const { title, description, expense, income, donation } = req.body;

    const account = new Account({ title, description, expense, income, donation });

    // console.log(account.income);
    // * logic to prevent zero or less than zero number
    if (account.income <= 0 && account.expense <= 0 && account.donation <= 0) {
        throw (new AppError("Valid number is required", 400))
    } else if (account.income === null || account.expense === null || account.donation === null) {
        throw (new AppError("Number is required", 400))
    }

    // * to check if title is entered or not
    if (!account.title) {
        throw (new AppError("Title is required", 400))
    }
    // * to check if description is entered or not
    if (!account.description) {
        throw (new AppError("Description is required", 400))
    }

    date.accounts.push(account);
    account.date = date;
    account.admin = req.user._id;

    await account.save();
    await date.save();
    req.flash("success", "Entry created!");
    res.redirect(`/dates/${id}`);
}

module.exports.deleteEntry = async (req, res) => {
    const id = req.params.id;
    const accountId = req.params.accountId;
    await Account.findByIdAndDelete(accountId);
    // res.send("I'm delete");
    req.flash("success", "Entry deleted!");
    res.redirect(`/dates/${id}`);
}
