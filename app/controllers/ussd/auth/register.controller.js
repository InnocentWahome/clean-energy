/* eslint-disable max-len */
/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { sms, ussd, menu } = require('../../../config/africastalking');
const UserModel = require('../../../models/user.model');
const LoginController = require('./login.controller');

const dataToSave = {};

module.exports = async function registerController(req, res) {
  try {
    menu.state('entry-point-to-register-controller', {
      run: () => {
        menu.con('Are you a new member? Is this your first time here, please register, if not, please login to continue'
              + '\n1. Register'
              + '\n2. Login');
      },
      next: {
        1: 'new-account',
        2: 'login-to-account',
      },
    });

    menu.state('new-account', {
      run: async () => {
        menu.con('Please enter your name in this format: Firstname Lastname');
      },
      next: {
        '*[a-zA-Z]+': 'registerEmail',
      },
    });

    menu.state('login-to-account', {
      run() {
        LoginController(req, res);
      },
    });

    menu.state('registerEmail', {
      run: async () => {
        const name = menu.val;
        dataToSave.name = name;
        console.log('dataToSave', dataToSave);
        menu.con(`Alright ${dataToSave.name}, please enter your email address`);
      },
      next: {
        '*[a-zA-Z]+': 'finish-registration',
      },
    });

    menu.state('finish-registration', {
      run: async () => {
        const email = menu.val;
        dataToSave.email = email;
        console.log('dataToSave last at registerEmail', dataToSave);

        // Save the data
        const data = new UserModel({
          name: dataToSave.name,
          email: dataToSave.email,
        });

        const dataSaved = await data.save();
        console.log('dataSaved', dataSaved);
        const options = {
          to: menu.args.phoneNumber,
          message: `Hi ${dataToSave.name}, you have successfully registered your account. Your login email is ${dataToSave.email}`,
        };
        await sms.send(options);
        menu.end('You will receive a confirmation text from us shortly. Thank you for registering with us.');
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
