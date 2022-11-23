/* eslint-disable no-console */
// .env file configurations
require('dotenv/config');

// importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { sms } = require('./config/africastalking');
// database configurations
require('./config/database')(mongoose);

// send sms server
const chatbotSMS = require('./controllers/sms/chatbot.controller');

// initializing the app
const app = express();

//  required middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Default server port
app.get('/', (req, res) => {
  res.send('Your server is running');
});

let data1 = {};
// listen for incoming messagesW
// after running the server, set ngrok callback url with this route
app.post('/incoming-messages', (req, res) => {
  const data = req.body;
  data1 = req.body;
  console.log('this is what im looing for', data1);
  console.log('Received message', data);
  console.log('Here is the body of the text:', data.text);
  chatbotSMS(req, res);
  // this response is required by Africa's Talking
  console.log('finished here');
  res.sendStatus(200);
});
console.log('what happens next', data1);

if (data1.text === 'wahome') {
  try {
    console.log('sending new sms');
    const result = sms.send({
      to: data1.from,
      message: 'Hey AT Ninja! Wassup.. This has been called after receiving wahome text.',
      from: data1.to,
    });
    console.log(result);
  } catch (ex) {
    console.error(ex);
  }
}

// // listen for incoming messages
// app.post('/delivery-reports', (req, res) => {
//   const data = req.body;
//   console.log('Received report: \n ', data);
//   res.sendStatus(200);
// });

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
