/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        id: '8439344c-f2f7-4ce4-bad6-3e8653b3100d',
        name: 'Chiocheti',
        phone: '19993216566',
        password: bcrypt.hashSync('chiocheti', 10),
        username: 'Chiocheti',
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
