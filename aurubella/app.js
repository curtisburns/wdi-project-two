// requires
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const PORT = 8000;
const router = require('./config/routes');


const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/aurubella');

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

// routes
app.use(router);

// sets up port to listen
app.listen(PORT, () => console.log(`Express is now listening on port ${PORT}`));
