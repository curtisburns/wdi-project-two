// requires
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const router = require('./config/routes');
const session = require('express-session');
const flash = require('express-flash');
const User = require('./models/user');

const {PORT, DB_URI} = require('./config/environment');

// set up mongoose
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(DB_URI);

// layouts
app.set('view engine', 'ejs'); //sets up the template engine - ejs
app.use(expressLayouts); //configures the first piece of middleware - express-ejs-layouts
app.set('views', `${__dirname}/views`); //sets up the views filepath

// static files
app.use(express.static(`${__dirname}/public`)); //sets up public filepath

// middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
// this allows us to set up a sessionID and save to a cookie
app.use(session({
  secret: 'canCallThisAnything',
  resave: false,
  saveUninitialized: false
}));
// this allows us to check the cookie to determine if a user is logged in
app.use((req, res, next) => {
  if(!req.session.userId) return next();
  User
    .findById(req.session.userId)
    .then(user => {
      res.locals.user = user;
      res.locals.isLoggedIn = true;
      next();
    });
});

app.use(flash());

// routes
app.use(router);

// sets up port to listen
app.listen(PORT, () => console.log(`Express is now listening on port ${PORT}`));
