const express = require("express");
const ownersRouter = express.Router();
const ownerModel = require("../models/owner-model.js");

// This is a development route only, hence when we deploy this application there will be no create route available for use.
if (process.env.NODE_ENV === "development") {
    ownersRouter.post("/create", async function (req, res) {
        let owner = await ownerModel.find();
        if (owner.length > 0) {
            return res
                .status(503)
                .send("You are not allowed to create a owner!");
        }

        const { fullname, email, password } = req.body;

        let newOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });

        res.status(202).send(newOwner);
    });
}

ownersRouter.get("/admin", function (req, res) {
    let success = req.flash("success");
    res.render("createproducts.ejs", { success });
});

module.exports = ownersRouter;
