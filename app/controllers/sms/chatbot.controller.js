/* eslint-disable no-console */
const { sms } = require('../../config/africastalking');

const number = '+254771251755';
const code = '23881';
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
        // eslint-disable-next-line no-useless-concat
        message:
          "Hello, My name is Max. I am Maximoff's automated reply system."
          + '\nWhat would you like to do today?'
          + '\n\n 1. Find more about Maximoff'
          + '\n\n 2. See projects near you',
        from: code,
      });
      console.log(result);
    } else if (text === '4' || text === '5' || text === '6') {
      // eslint-disable-next-line no-nested-ternary
      const project = text === '4'
        ? ' Bio Gas Digestor '
        : text === '5'
          ? 'Solar Panels'
          : 'Wind Turbines';
      const result = await sms.send({
        to: number,
        message: `Let's schedule a meeting with one of us who will guide you on how you can get started with ${project}. Enter date in YYYY-MM-DD format.`,
        from: code,
      });
      console.log(result);
    } else if (text === '1') {
      // eslint-disable-next-line no-nested-ternary
      const result = await sms.send({
        to: number,
        message:
          "Maximoff is a system that provides data intermediary solutions to improve the quality of clean energy implementation. Let's schedule a meeting with one of us who will guide you on how you can get started with . Enter date in YYYY-MM-DD format.",
        from: code,
      });
      console.log(result);
    } else if (text === '2') {
      // eslint-disable-next-line no-nested-ternary
      const result = await sms.send({
        to: number,
        message: 'What country would you like to join a project from?',
        from: code,
      });
      console.log(result);
    } else if (text === 'nakuru' || text === 'nairobi') {
      const result = await sms.send({
        to: number,
        message: `At ${text}, we have the following projects. (Respond with number)\n1. Bio Gas Digestor \n2. Solar Panels \n3. Wind turbines`,
        from: code,
      });
      console.log(result);
    } else if (text.match(date)) {
      const result = await sms.send({
        to: number,
        message: `What time on ${text} would you like to have the meeting? `,
        from: code,
      });
      console.log(result);
    } else if (text.match(time)) {
      const result = await sms.send({
        to: number,
        message:
          'Thank you for you time. One of us will contact you to confirm the appointment',
        from: code,
      });
      console.log(result);
    } else {
      console.log('Sorry. What are you saying my friend.');
      const result = await sms.send({
        to: number,
        message:
          "Sorry, I couldn't understand that. Could you select from the list of menus",
        from: code,
      });
      console.log(result);
    }
  } catch (error) {
    console.error(error);
  }
};
