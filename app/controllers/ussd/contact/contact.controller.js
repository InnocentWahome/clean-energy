/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { sms, ussd, menu } = require('../../../config/africastalking');
const ScheduleModel = require('../../../models/schedule.model');

const dataToSave = {};

module.exports = async function helpController(req, res) {
  try {
    menu.state('entry-point-to-contact-controller', {
      run: () => {
        menu.con(
          'We would love to discuss with you about the projects'
            + '\n1. Schedule a call back'
            + '\n2. Talk with a live agent'
            + '\n3. Talk to max, our AI chatbot',
        );
      },
      // next object links to next state based on user input
      next: {
        1: 'schedule-a-callback',
        2: 'live-agent',
        3: 'talk-to-chatbot',
      },
    });

    menu.state('schedule-a-callback', {
      run: () => {
        menu.con(
          'Please provide a date you are free to talk in this format YYYY-MM-DD',
        );
      },
      // next object links to next state based on user input
      next: {
        '*[a-zA-Z]+': 'schedule-a-callback-time',
      },
    });

    menu.state('schedule-a-callback-time', {
      run: () => {
        const date = menu.val;
        dataToSave.date = date;
        menu.con(
          `Date: ${date} set.Please provide a time you are free to talk in this format 12:00PM`,
        );
      },
      // next object links to next state based on user input
      next: {
        '*[a-zA-Z]+': 'finish-schedule-a-callback',
      },
    });

    menu.state('finish-schedule-a-callback', {
      run: async () => {
        const time = menu.val;
        dataToSave.time = time;

        // send the data to the database
        const data = new ScheduleModel({
          date: dataToSave.date,
          time: dataToSave.time,
          phoneNumber: req.body.phoneNumber,
        });
        const dataSaved = await data.save();
        console.log('dataSaved', dataSaved);
        const options = {
          to: menu.args.phoneNumber,
          message: `Hi there, we've reserved date: ${dataToSave.date} and time: ${dataToSave.time} for you. See you then`,
        };
        await sms.send(options);
        console.log('sms sent');
        menu.end(
          `Your schedule is set for, Date: ${dataToSave.date} and Time: ${time}. You will receive a text message confirming the schedule.`,
        );
        // TODO: send a text message to the user
      },
    });

    menu.state('live-agent', {
      run: () => {
        menu.end(
          'Our customer care number is 0745020416. One of our agents will call you from this number to assist you. Thank you for choosing us for your energy solutions.',
        );
      },
    });

    menu.state('talk-to-chatbot', {
      run: () => {
        menu.end(
          'Here at Maximoff, we have a toll free, automated reply system. We call it Max. Max is a chatbot that will answer your questions. To talk to Max, please text the alphanumeric MAX. Thank you for choosing us for your energy solutions.',
        );
      },
    });
    console.log('result');
    menu.run(req.body, (ussdResult) => {
      res.send(ussdResult);
    });
  } catch (error) {
    console.error(error);
  }
};
