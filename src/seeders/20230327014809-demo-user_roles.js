/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('user_roles', [
      {
        id: uuidv4(),
        role_id: '0edab452-656d-4fc0-b16e-3548e2cd98a5', // Administrativo
        user_id: '8439344c-f2f7-4ce4-bad6-3e8653b3100d', // Chiocheti
      },
      {
        id: uuidv4(),
        role_id: '3081af08-331e-405f-992b-faeed163184c', // Financeiro
        user_id: '8439344c-f2f7-4ce4-bad6-3e8653b3100d', // Chiocheti
      },
      {
        id: uuidv4(),
        role_id: '148237cf-380b-4640-a945-9448e6e8fe4a', // Setor de Sócios
        user_id: '8439344c-f2f7-4ce4-bad6-3e8653b3100d', // Chiocheti
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('user_roles', null, {});
  },
};
