
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const app = express();

const PORT = process.env.PORT || 3000;



const connectDB = require('./config/db');
connectDB();

// import passport
require('./config/passport')(passport);

app.set('view engine', 'ejs');

//set public
app.use(express.static('public'))

//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    //storing session in database
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_URL,
    })
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());



// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//methodovveride middleware
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

//routes
app.use('/', require('./routes/user'))
app.use('/', require('./routes/home'))
app.use('/', require('./routes/add'))
app.use('/', require('./routes/edit'))
app.use('/', require('./routes/delete'))



app.listen(PORT, () => console.log(`listening to the port ${PORT}`));
