'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Authors', [{
      id: 1,
      first_name: 'George',
      last_name: 'Orwell',
      dob: '1903-06-25',
      country: 'English',
      createdAt: '2020-06-20',
      updatedAt: '2020-06-20'
    },
      {
        id: 2,
        first_name: 'Richard',
        last_name: 'Thaler',
        dob: '1945-09-12',
        country: 'USA',
        createdAt: '2020-06-20',
        updatedAt: '2020-06-20'
      },
      {
        id: 3,
        first_name: 'Han',
        last_name: 'Kang',
        dob: '1970-11-27',
        country: 'South Korea',
        createdAt: '2020-06-20',
        updatedAt: '2020-06-20'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authors', null, {});
  }
};
