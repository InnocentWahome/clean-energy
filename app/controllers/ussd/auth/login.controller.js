/* eslint-disable max-len */
/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { sms, ussd, menu } = require('../../../config/africastalking');
// const UserModel = require('../../../models/user.model');

const dataToSave = {};

module.exports = async function registerController(req, res) {
  try {
    menu.state('login-to-account', {
      run: async () => {
        menu.con('Please enter your email. If it is valid, you will receive a confirmation text from us shortly.');
      },
      next: {
        '*[a-zA-Z]+': 'confirm-email-verification',
      },
    });

    menu.state('confirm-email-verification', {
      run: async () => {
        const email = menu.val;
        dataToSave.email = email;
        console.log('dataToSave', dataToSave);

        // send verification code
        const options = {
          to: menu.args.phoneNumber,
          message: 'Hi there, Your verification code is 43235',
        };
        await sms.send(options);

        menu.con('Please enter the verification code sent to your phone');
      },
      next: {
        '*[a-zA-Z]+': 'verification-success',
      },
    });

    menu.state('verification-success', {
      run: async () => {
        menu.end('You have successfully logged in. You can now access the rest of the applications.');
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
