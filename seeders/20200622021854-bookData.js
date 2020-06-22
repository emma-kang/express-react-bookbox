'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      id: 1,
      title: 'Animal Farm',
      authorid: 1,
      publisher: 'Penguin UK',
      published: '2008-07-29',
      category: 'Novel',
      isbn: '9780141036137',
      language: 'English',
      imageurl: null,
      createdAt: '2020-06-20',
      updatedAt: '2020-06-20'
    },
      {
        id: 2,
        title: '1984',
        authorid: 1,
        publisher: 'Penguin UK',
        published: '2008-07-29',
        category: 'Novel',
        isbn: '9780141036144',
        language: 'English',
        imageurl: null,
        createdAt: '2020-06-20',
        updatedAt: '2020-06-20'
      },
      {
        id: 3,
        title: 'Nudge: Improving Decisions About Health, Wealth, And Happiness',
        authorid: 2,
        publisher: 'Penguin Publishing Group',
        published: '2009-02-24',
        category: 'Economics',
        isbn: '9780143115267',
        language: 'English',
        imageurl: null,
        createdAt: '2020-06-20',
        updatedAt: '2020-06-20'
      },
      {
        id: 4,
        title: 'The Vegetarian',
        authorid: 3,
        publisher: 'Granta Publications',
        published: '2015-12-16',
        category: 'Novel',
        isbn: '9781846276033',
        language: 'English',
        imageurl: null,
        createdAt: '2020-06-20',
        updatedAt: '2020-06-20'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
