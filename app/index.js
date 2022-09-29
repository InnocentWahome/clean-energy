/* eslint-disable no-console */
// .env file configurations
require('dotenv/config');

// importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const { I18n } = require('i18n');
const path = require('path');

// const { sms } = require('./config/africastalking');

// database configurations
require('./config/database')(mongoose);

// send sms server
const chatbotSMS = require('./controllers/sms/chatbot.controller');
const AppController = require('./controllers/ussd/app.controller');

// initializing the app
const app = express();

//  required middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

const i18n = new I18n({
  locales: ['en', 'sw'],
  directory: path.join(__dirname, 'locales'),
});
/**
 * later in code configure
 */
app.use(i18n.init);

i18n.configure({
  locales: ['en', 'sw'],
  directory: path.join(__dirname, '/locales'),
  // you may alter a site wide default locale
  defaultLocale: 'en',
});
// Default server port
app.get('/', (req, res) => {
  i18n.init(req, res);
  res.send('Your server is running');
});

// routes
// app.use('/', AppRoutes);

// entry point to current ussd app using ussd-builder states and menus
app.post('/ussd', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const data = req.body;
  AppController(req, res);
});

// listen for incoming messages
// after running the server, set ngrok callback url with this route
app.post('/incoming-messages', (req, res) => {
  const data = req.body;
  console.log('Received message', data);
  console.log('Here is the body of the text:', data.text);
  chatbotSMS(req, res);
  // this response is required by Africa's Talking
  res.sendStatus(200);
});

// define the port
const port = parseInt(process.env.PORT, 10) || 3000;

// port listening
app.listen(port, () => {
  try {
    console.log(`Server is running on port: ${port}`);
  } catch (error) {
    console.error(error);
  }
});
