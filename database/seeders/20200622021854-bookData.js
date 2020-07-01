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
      updatedAt: '2020-06-30',
      description: 'All animals are equal. But some animals are more equal than others.'
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
        updatedAt: '2020-06-30',
        description: 'Nineteen Eighty-Four centres on the consequences of government over-reach, totalitarianism, mass surveillance, and repressive regimentation of all persons and behaviours within society'
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
        updatedAt: '2020-06-30',
        description: 'Every day, we make decisions on topics ranging from personal investments to schools for our children to the meals we eat to the causes we champion.'
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
        updatedAt: '2020-06-30',
        description: 'Before the nightmare, Yeong-hye and her husband lived an ordinary life. But when splintering, blood-soaked images start haunting her thoughts, Yeong-hye decides to purge her mind and renounce eating meat.'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
