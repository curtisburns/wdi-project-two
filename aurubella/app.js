// requires
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = 8000;
const router = require('./config/routes');

// layouts
app.set('view engine', 'ejs'); //sets up the template engine - ejs
app.use(expressLayouts); //configures the first piece of middleware - express-ejs-layouts
app.set('views', `${__dirname}/views`); //sets up the views filepath

// static files
app.use(express.static(`${__dirname}/public`)); //sets up public filepath

// middleware

// routes
app.use(router);

// sets up port to listen
app.listen(PORT, () => console.log(`Express is now listening on port ${PORT}`));
