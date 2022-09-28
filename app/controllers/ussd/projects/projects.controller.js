/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { sms, ussd, menu } = require('../../../config/africastalking');
// eslint-disable-next-line no-unused-vars

module.exports = async function subscriptionsController(req, res) {
  try {
    menu.state('entry-point-to-projects-controller', {
      run: async () => {
        menu.con('Here are the projects available in your area'
        + '\n1. Solar panels'
        + '\n2. Heat pumps'
        + '\n3. Wind turbines'
        + '\n4. Electric cars'
        + '\n5. Smart Homes');
      },
      // next object links to next state based on user input
      next: {
        1: 'solar-panels',
        2: 'heat-pumps',
        3: 'wind-turbines',
        4: 'electric-cars',
        5: 'smart-homes',
      },
    });

    menu.state('solar-panels', {
      run: async () => {
        menu.con('The solar panels project is a project that will help you save money on your electricity bill. Here is more information about it: '
        + '\nStartDate: 2032-10-01'
        + '\nEndDate:  2032-11-01'
        + '\nRegistered Users: 12'
        + '\nContact info. 0722 222 333'
        + '\n'
        + '\n1. Register for this project'
        + '\n2. Go back to projects');
      },
      // next object links to next state based on user input
      next: {
        1: 'new-project-subscription-solar-panels',
        2: 'entry-point-to-projects-controller',
      },
    });

    menu.state('heat-pumps', {
      run: async () => {
        menu.con('The heat pumps project is a project that will help you save money on your electricity bill. Here is more information about it: '
        + '\nStartDate: 2032-10-01'
        + '\nEndDate:  2032-11-01'
        + '\nRegistered Users: 12'
        + '\nContact info. 0723 432 657'
        + '\n'
        + '\n1. Register for this project'
        + '\n2. Go back to projects');
      },
      // next object links to next state based on user input
      next: {
        1: 'new-project-subscription-heat-pumps',
        2: 'entry-point-to-projects-controller',
      },
    });

    menu.state('wind-turbines', {
      run: async () => {
        menu.con('The wind turbines project is a project that will help you save money on your electricity bill. Here is more information about it: '
        + '\nStartDate: 2032-10-01'
        + '\nEndDate:  2032-11-01'
        + '\nRegistered Users: 12'
        + '\nContact info. 0719 222 222'
        + '\n'
        + '\n1. Register for this project'
        + '\n2. Go back to projects');
      },
      // next object links to next state based on user input
      next: {
        1: 'new-project-subscription-wind-turbines',
        2: 'entry-point-to-projects-controller',
      },
    });

    menu.state('electric-cars', {
      run: async () => {
        menu.con('The electric cars project is a project that will help you save money on your electricity bill. Here is more information about it: '
        + '\nStartDate: 2032-10-01'
        + '\nEndDate:  2032-11-01'
        + '\nRegistered Users: 12'
        + '\nContact info. 0798 765 432'
        + '\n'
        + '\n1. Register for this project'
        + '\n2. Go back to projects');
      },
      // next object links to next state based on user input
      next: {
        1: 'new-project-subscription-electric-cars',
        2: 'entry-point-to-projects-controller',
      },
    });

    menu.state('smart-homes', {
      run: async () => {
        menu.con('The smart homes project is a project that will help you save money on your electricity bill. Here is more information about it: '
        + '\nStartDate: 2032-10-01'
        + '\nEndDate:  2032-11-01'
        + '\nRegistered Users: 12'
        + '\nContact info. 0712 345 678'
        + '\n'
        + '\n1. Register for this project'
        + '\n2. Go back to projects');
      },
      // next object links to next state based on user input
      next: {
        1: 'new-project-subscription-smart-homes',
        2: 'entry-point-to-projects-controller',
      },
    });

    menu.state('new-project-subscription-smart-homes', {
      run: async () => {
        menu.end('You have successfully subscribed to the smart homes project. You will receive a confirmation message shortly.');
      },
    });

    menu.state('new-project-subscription-electric-cars', {
      run: async () => {
        menu.end('You have successfully subscribed to the electric cars project. You will receive a confirmation message shortly.');
      },
    });

    menu.state('new-project-subscription-wind-turbines', {
      run: async () => {
        menu.end('You have successfully subscribed to the wind turbines project. You will receive a confirmation message shortly.');
      },
    });

    menu.state('new-project-subscription-heat-pumps', {
      run: async () => {
        menu.end('You have successfully subscribed to the heat pumps project. You will receive a confirmation message shortly.');
      },
    });

    menu.state('new-project-subscription-solar-panels', {
      run: async () => {
        menu.end('You have successfully subscribed to the solar panels project. You will receive a confirmation message shortly.');
      },
    });

    const resMsg = await menu.run(req.body);
    res.send(resMsg);
  } catch (error) {
    console.error(error);
  }
};
