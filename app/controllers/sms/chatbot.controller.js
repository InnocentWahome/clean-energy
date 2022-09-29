/* eslint-disable no-console */
const { sms } = require('../../config/africastalking');

const number = '+254739587370'
const code = '13580'
const date = /^\d{4}-\d{2}-\d{2}$/;
const time = /^(\d{2}:\d{2})([AaPp][Mm])$/;

// eslint-disable-next-line no-unused-vars
module.exports = async function sendSMS(req, res) {
  // create a new express session
  try {
    const { text } = req.body;
    if (text === 'hi' || text === 'hello') {
      const result = await sms.send({
        to: number,
        message: `Hello too you too. Welcome to Maximoff. \nPlease enter your town name so that can find Clean energy solution near you.`,
        from: code,
      });
      console.log(result);
    }else if(text === 'nakuru' || text === 'nairobi') {
      const result = await sms.send({
        to: number,
        message: `At ${text}, we have the following projects. (Respond with number)\n1. Bio Gas Digestor \n2. Solar Panels \n3. Wind turbines`,
        from: code,
      });
      console.log(result);
    }else if(text === '1' || text === '2' || text === '3') {
      const project = text === '1' ? ' Bio Gas Digestor ' : text === '2'? 'Solar Panels' : 'Wind Turbines';
      const result = await sms.send({
        to: number,
        message: `Let's schedule a meeting with one of us who will guide you on how you can get started with ${project}. Enter date in YYYY-MM-DD format.`,
        from: code,
      });
      console.log(result);
    }else if(text.match(date)) {
      const result = await sms.send({
        to: number,
        message: `What time on ${text} would you like to have the meeting? `,
        from: code,
      });
      console.log(result);
    }else if(text.match(time)) {
      const result = await sms.send({
        to: number,
        message: `Thank you for you time. One of us will contact you to confirm the appointment`,
        from: code,
      });
      console.log(result);
    }else {
      console.log(`Sorry. What are you saying my friend.`);
      const result = await sms.send({
        to: number,
        message: `Sorry. What are you saying my friend.`,
        from: code,
      });
      console.log(result);
    }
  } catch (error) {
    console.error(error);
  }
};
