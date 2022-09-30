/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { sms, ussd, menu } = require('../../../config/africastalking');

const dataToSave = {};
module.exports = async function ManualController(req, res) {
  try {
    menu.state('entry-point-to-manual-controller', {
      run: () => {
        menu.con('Here you can get more information about the following services we offer'
              + '\n1. How it works'
              + '\n2. Our mission'
              + '\n3. Our vision'
              + '\n4. Want to partner with us?');
      },
      // next object links to next state based on user input
      next: {
        1: 'how-it-works',
        2: 'our-mission',
        3: 'our-vision',
        4: 'partner-with-us',
      },
    });

    menu.state('how-it-works', {
      run: () => {
        menu.con(' We do this by giving innovators a chance to showcase their solutions in either Affordable Housing or Manufacturing or more.  '
              + '\n1. Back'
              + '\n2. Learn more'
              + '\n3. End');
      },
      // next object links to next state based on user input
      next: {
        1: 'entry-point-to-manual-controller',
        2: 'entry-point-to-contact-controller',
        3: 'quit-manual-controller',
      },
    });

    menu.state('our-mission', {
      run: () => {
        menu.end('Our mission at Maximoff is to provide a data intermediary solutions to improve the quality of clean energy implementation.');
      },
      // n
    });

    menu.state('our-vision', {
      run: () => {
        menu.end('Our Vision at Maximoff is to empower upcoming energy solutions. ');
      },
    });

    menu.state('partner-with-us', {
      run: () => {
        menu.con('Please tell us about your project');
      },
      // next object links to next state based on user input
      next: {
        '*[a-zA-Z]+': 'contact-project-owner',
      },
    });

    menu.state('contact-project-owner', {
      run: () => {
        const name = menu.val;
        dataToSave.name = name;
        menu.con('Awesome. We would love to talk about your project with you.'
        + '\n1. Contact me'
        + '\n2  Quit');
      },
      // next object links to next state based on user input
      next: {
        1: 'entry-point-to-contact-controller',
        2: 'quit-manual-controller',
      },
    });

    menu.state('quit-manual-controller', {
      run: () => {
        menu.end('We hope you found the information useful. Please contact us if you have any questions.');
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
