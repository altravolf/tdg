const express = require("express");
const Account = require("../models/accounts");
const Dates = require("../models/dates");
const Admin = require("../models/admin");
const AppError = require("../utils/appError");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const isLoggedIn = require("../middleware/isLoggedIn");

const accountsController = require("../controller/accountsController");
const isAccountAdmin = require("../middleware/isAccountAdmin");


router.get("/dates/:id/accounts/expense", isLoggedIn, catchAsync(accountsController.showExpense))

router.get("/dates/:id/accounts/income", isLoggedIn, catchAsync(accountsController.showIncome))

router.get("/dates/:id/accounts/donation", isLoggedIn, catchAsync(accountsController.showDonation))

router.get("/dates/:id/create", catchAsync(accountsController.showCreate))

router.post("/dates/:id/accounts", isLoggedIn, catchAsync(accountsController.createEntry))

router.delete("/dates/:id/accounts/:accountId", isLoggedIn, isAccountAdmin, catchAsync(accountsController.deleteEntry))

module.exports = router;