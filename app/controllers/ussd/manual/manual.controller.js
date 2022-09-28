/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { sms, ussd, menu } = require('../../../config/africastalking');

module.exports = async function ManualController(req, res) {
  try {
    menu.state('entry-point-to-manual-controller', {
      run: () => {
        menu.con('Here you can get more information about the following services we offer'
              + '\n1. Our project delivery system'
              + '\n2. How it works'
              + '\n3. Our mission'
              + '\n4. Our vision'
              + '\n5. Want to partner with us?');
      },
      // next object links to next state based on user input
      next: {
        1: 'project-delivery-system',
        2: 'how-it-works',
        3: 'our-mission',
        4: 'our-vision',
        5: 'partner-with-us',
      },
    });

    menu.state('project-delivery-system', {
      run: () => {
        menu.con('Text test text'
              + '\n0. Back'
              + '\n1. Contact us with a question'
              + '\n2. End');
      },
      // next object links to next state based on user input
      next: {
        0: 'entry-point-to-manual-controller',
        1: 'entry-point-to-contact-controller',
        2: 'quit-manual-controller',
      },
    });

    menu.state('how-it-works', {
      run: () => {
        menu.con('Here at ........ we have a simple process for delivering projects to our clients'
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
        menu.con('Here you can get more information about the following services we offer'
              + '\n1. Our project delivery system'
              + '\n2. How it works'
              + '\n3. Our mission'
              + '\n4. Our vision'
              + '\n4. Want to partner with us?');
      },
      // next object links to next state based on user input
      next: {
        1: 'project-delivery-system',
        2: 'how-it-works',
        3: 'our-mission',
        4: 'partner-with-us',
      },
    });

    menu.state('our-vision', {
      run: () => {
        menu.con('Here you can get more information about the following services we offer'
              + '\n1. Our project delivery system'
              + '\n2. How it works'
              + '\n3. Our mission'
              + '\n4. Our vision'
              + '\n4. Want to partner with us?');
      },
      // next object links to next state based on user input
      next: {
        1: 'project-delivery-system',
        2: 'how-it-works',
        3: 'our-mission',
        4: 'partner-with-us',
      },
    });

    menu.state('partner-with-us', {
      run: () => {
        menu.con('Here you can get more information about the following services we offer'
              + '\n1. Our project delivery system'
              + '\n2. How it works'
              + '\n3. Our mission'
              + '\n4. Our vision'
              + '\n4. Want to partner with us?');
      },
      // next object links to next state based on user input
      next: {
        1: 'project-delivery-system',
        2: 'how-it-works',
        3: 'our-mission',
        4: 'partner-with-us',
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
