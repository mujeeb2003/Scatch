const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isloggedin.js");
const { logoutUser } = require("../controllers/authController.js");
const productModel = require("../models/product-model.js");

router.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index.ejs", { error });
});

router.get("/shop", isLoggedIn, async function (req, res) {
    const products = await productModel.find();
    res.render("shop.ejs", { products });
});

router.get("/logout", isLoggedIn, logoutUser);

module.exports = router;
