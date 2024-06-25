const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const path = require('path');
const ejs = require("ejs");
const db = require("./config/mongoose-connection.js");
const expressSession = require('express-session');
const flash = require('connect-flash');
require("dotenv").config();
const ownersRouter = require('./routes/ownersRouter.js');
const usersRouter = require('./routes/usersRouter.js');
const productsRouter = require('./routes/productsRouter.js');
const indexRouter = require('./routes/index.js');

// Middleware
app.use(express.json()); //used for post requests
app.use(express.urlencoded({extended:true})); // Used for parsing urlencoded bodies which are sent in the request body (such as forms)
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret: process.env.SESSION_SECRET,
}))
app.use(flash());

// view engine settings
app.set('view engine','ejs');
app.set('async: true'); 

// Routes
app.use('/',indexRouter);
app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);


app.listen(PORT,() => console.log(`Server started on http://localhost:${PORT}`))