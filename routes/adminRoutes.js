const express = require("express");
const Admin = require("../models/admin");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const AppError = require("../utils/appError");

const adminController = require("../controller/adminController");

router.get("/register", catchAsync(adminController.showRegister));

router.post("/register", catchAsync(adminController.createRegister));

router.get("/login", catchAsync(adminController.showLogin));

const authConfig = { failureFlash: true, failureRedirect: "/login", keepSessionInfo: true }

router.post("/login", passport.authenticate("local", authConfig), catchAsync(adminController.createLogin));

router.get("/logout", adminController.showLogout)

module.exports = router;