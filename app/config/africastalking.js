const credentials = {
  apiKey: process.env.AT_SANDBOX_API_KEY,
  username: process.env.AT_SANDBOX_USERNAME,
};

const Africastalking = require('africastalking')(credentials);

const sms = Africastalking.SMS;
const voice = Africastalking.VOICE;

const UssdMenu = require('ussd-builder');

const menu = new UssdMenu();
const sessions = {};
const DefaultSessions = menu.sessionConfig({
  start: (sessionId, callback) => {
    // initialize current session if it doesn't exist
    // this is called by menu.run()
    if (!(sessionId in sessions)) sessions[sessionId] = {};
    callback();
  },
  end: (sessionId, callback) => {
    // clear current session
    // this is called by menu.end()
    delete sessions[sessionId];
    callback();
  },
  set: (sessionId, key, value, callback) => {
    // store key-value pair in current session
    sessions[sessionId][key] = value;
    callback();
  },
  get: (sessionId, key, callback) => {
    // retrieve value by key in current session
    const value = sessions[sessionId][key];
    callback(null, value);
  },
});

module.exports = {
  sms, menu, voice, DefaultSessions,
};
