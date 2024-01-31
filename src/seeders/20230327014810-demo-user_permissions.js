/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('user_permissions', [
      {
        id: uuidv4(),
        user_id: '8439344c-f2f7-4ce4-bad6-3e8653b3100d', // Chiocheti
        permission_id: '808e2898-ea9c-4130-82ef-3c68a61b4e76', // Administrativo
      },
      {
        id: uuidv4(),
        user_id: '8439344c-f2f7-4ce4-bad6-3e8653b3100d', // Chiocheti
        permission_id: '3993aff2-ef30-4f71-8a9f-4e1b3e672e1b', // Financeiro
      },
      {
        id: uuidv4(),
        user_id: '8439344c-f2f7-4ce4-bad6-3e8653b3100d', // Chiocheti
        permission_id: '4be51d1f-35fc-42cc-b4a1-0e6d3227fdf9', // Setor de Sócios
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('user_roles', null, {});
  },
};
