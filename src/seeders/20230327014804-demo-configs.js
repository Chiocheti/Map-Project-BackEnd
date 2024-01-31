/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('configs', [
      {
        id: uuidv4(),
        amount: 0,
        check_number: 0,
        receiver_number: 0,
        actualized_monthly_credit: false,
        actualized_annual_credit: false,
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('configs', null, {});
  },
};
