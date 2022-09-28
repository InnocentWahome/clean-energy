/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { sms, ussd, menu } = require('../../../config/africastalking');
// const Model = require('../../../models/user.model');
// eslint-disable-next-line no-unused-vars
// const projectsList = require('../../../data/projects.json');
const projectsList = [
  {
    name: 'Solar panels',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    startDate: '2022-10-01',
    endData: '2023-01-01',
    users: '12',
    is_open: true,
    imageUrl: 'https://source.unsplash.com/user/c_v_r/1600x900',
    unique_id: '123456789',
  },
  {
    name: 'Heat pumps',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    startDate: '2032-10-01',
    endData: '2043-01-01',
    users: '23',
    is_open: false,
    imageUrl: 'https://source.unsplash.com/user/c_v_r/1600x900',
    unique_id: '5444343',
  },
  {
    name: 'Wind turbines',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    startDate: '2022-10-01',
    endData: '2023-01-01',
    users: '12',
    is_open: true,
    imageUrl: 'https://source.unsplash.com/user/c_v_r/1600x900',
    unique_id: '123456789',
  },
  {
    name: 'Hydrogen',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    startDate: '2032-10-01',
    endData: '2043-01-01',
    users: '23',
    is_open: false,
    imageUrl: 'https://source.unsplash.com/user/c_v_r/1600x900',
    unique_id: '5444343',
  },
  {
    name: 'Batteries',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    startDate: '2022-10-01',
    endData: '2023-01-01',
    users: '12',
    is_open: true,
    imageUrl: 'https://source.unsplash.com/user/c_v_r/1600x900',
    unique_id: '123456789',
  }];

// console.log(projectsList);

// const dataToSave = {};

module.exports = async function subscriptionsController(req, res) {
  try {
    menu.state('entry-point-to-projects-controller', {
      // get all projects and display them in the menu
      run: async () => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < projectsList.length; i++) {
          console.log(`here it is${i + 1}. ${projectsList[i].name}`);
          menu.con('Here are the projects'
          + `\n${i + 1}. ${projectsList[i].description}`);
        }
        // end of for loop
      },
      // next object links to next state based on user input
      next: {
        1: 'project-1',
        2: 'project-2',
        3: 'project-3',
        4: 'project-4',
        5: 'project-5',
      },
    });

    // display the details of the project selected in new states

    menu.state('project-1', {
      run: () => {
        menu.end(
          `Name: ${projectsList[0].name}`
            + `\nDescription: ${projectsList[0].description}`
            + `\nStart date: ${projectsList[0].startDate}`
            + `\nEnd date: ${projectsList[0].endData}`
            + `\nUsers: ${projectsList[0].users}`
            + `\nIs open: ${projectsList[0].is_open}`
            + `\nImage url: ${projectsList[0].imageUrl}`
            + `\nUnique id: ${projectsList[0].unique_id}`,
        );
      },
    });
    menu.state('project-2', {
      run: () => {
        menu.end(
          `Name: ${projectsList[0].name}`
            + `\nDescription: ${projectsList[0].description}`
            + `\nStart date: ${projectsList[0].startDate}`
            + `\nEnd date: ${projectsList[0].endData}`
            + `\nUsers: ${projectsList[0].users}`
            + `\nIs open: ${projectsList[0].is_open}`
            + `\nImage url: ${projectsList[0].imageUrl}`
            + `\nUnique id: ${projectsList[0].unique_id}`,
        );
      },
    });
    menu.state('project-3', {
      run: () => {
        menu.end(
          `Name: ${projectsList[0].name}`
            + `\nDescription: ${projectsList[0].description}`
            + `\nStart date: ${projectsList[0].startDate}`
            + `\nEnd date: ${projectsList[0].endData}`
            + `\nUsers: ${projectsList[0].users}`
            + `\nIs open: ${projectsList[0].is_open}`
            + `\nImage url: ${projectsList[0].imageUrl}`
            + `\nUnique id: ${projectsList[0].unique_id}`,
        );
      },
    });

    const resMsg = await menu.run(req.body);
    res.send(resMsg);

    // menu.run(req.body, (ussdResult) => {
    //   if (ussdResult) {
    //     res.send(ussdResult);
    //   }
    // });
  } catch (error) {
    console.error(error);
  }
};
