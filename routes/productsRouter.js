const express = require("express");
const productsRouter = express.Router();
const upload = require("../config/multer-config.js");
const productModel = require("../models/product-model.js");

productsRouter.get("/", function (req, res) {
    res.send("Hey it's working!");
});

productsRouter.post(
    "/create",
    upload.single("image"),
    async function (req, res) {
        try {
            const { name, price, discount, bgcolor, panelcolor, textcolor } =
                req.body;

            await productModel.create({
                image: req.file.buffer,
                name,
                discount,
                price,
                bgcolor,
                panelcolor,
                textcolor,
            });

            req.flash("success", "Product created Successfully.");
            res.redirect("/owners/admin");
        } catch (err) {
            res.send(err.message);
        }
    }
);

module.exports = productsRouter;
