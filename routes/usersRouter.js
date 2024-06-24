const express = require('express');
const usersRouter = express.Router();


usersRouter.get('/',function(req,res){
    res.send("Hey it's working!");
});

module.exports = usersRouter;

