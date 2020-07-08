// * Dependencies
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

// * Load Config
dotenv.config({ path: './config/config.env' });

// * Passport config
require('./config/passport')(passport);

// * Connect to the database
connectDB();

// * Create the app object
const app = express();

// * Setup the logger for the requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// * Set the template engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// * Session
app.use(
  session({
    secret: 'anastasia',
    resave: false,
    saveUninitialized: false,
  })
);

// * Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// * Static folder for public resources
app.use(express.static(path.join(__dirname, 'public')));

// ** Link the filtes
// * Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

// * Get the port from the config file
const PORT = process.env.PORT || 3000;

// * Init the server
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
