const express = require('express');
const productsRouter = express.Router();


productsRouter.get('/',function(req,res){
    res.send("Hey it's working!");
});

module.exports = productsRouter;

