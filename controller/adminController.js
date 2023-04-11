const Admin = require("../models/admin");
const passport = require("passport");
const AppError = require("../utils/appError");


module.exports.showRegister = async (req, res) => {
    const check = {
        reg: "true"
    }

    if (req.query.reg === check.reg) {
        return res.render("admin/register");
    } else {
        throw new AppError("This action is not allowed!", 403)
    }
}

module.exports.createRegister = async (req, res, next) => {
    try {

        const check = {
            reg: "true"
        }

        if (req.query.reg === check.reg) {
            const { username, password } = req.body;
            const admin = new Admin({ username });
            const newAdmin = await Admin.register(admin, password);
            await newAdmin.save();
            req.login(newAdmin, (err) => {
                if (err) {
                    return next(err);
                } else {
                    req.flash("success", `Welcome, Dear ${username.slice(0, 1).toUpperCase() + username.slice(1)}`);
                    return res.redirect("/dates");
                }
            })
        } else {
            throw new AppError("This action is not allowed!", 403)
        }


    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/register");
    }
}

module.exports.showLogin = async (req, res) => {
    return res.render("admin/login");
}

module.exports.createLogin = async (req, res) => {
    const username = req.body.username;
    req.flash("success", `Welcome back, ${username.slice(0, 1).toUpperCase() + username.slice(1)}`)
    const redirectUrl = req.session.returnTo || "/dates";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.showLogout = async (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        } else {
            req.flash("success", "Goodbye");
            return res.redirect("/dates");
        }
    })
}