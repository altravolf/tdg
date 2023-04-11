const express = require("express");
const Dates = require("../models/dates");
const Account = require("../models/accounts");
const date = require("date-and-time");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const isLoggedIn = require("../middleware/isLoggedIn");
const isDateAdmin = require("../middleware/isDateAdmin");
const Admin = require("../models/admin");

const datesController = require("../controller/datesController");

router.get("/dates", catchAsync(datesController.showDates))

router.get("/dates/:id", catchAsync(datesController.table))

router.post("/dates", isLoggedIn, catchAsync(datesController.createDate))

router.delete("/dates/:id/delete", isLoggedIn, isDateAdmin, catchAsync(datesController.deleteDate))

module.exports = router;