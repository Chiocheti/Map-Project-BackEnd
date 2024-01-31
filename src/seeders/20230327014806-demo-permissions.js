/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('permissions', [
      {
        id: '4be51d1f-35fc-42cc-b4a1-0e6d3227fdf9',
        action: 'edit',
        resource: 'Setor de Sócios',
      },
      {
        id: uuidv4(),
        action: 'read',
        resource: 'Setor de Sócios',
      },
      {
        id: '3993aff2-ef30-4f71-8a9f-4e1b3e672e1b',
        action: 'edit',
        resource: 'Financeiro',
      },
      {
        id: uuidv4(),
        action: 'read',
        resource: 'Financeiro',
      },
      {
        id: '808e2898-ea9c-4130-82ef-3c68a61b4e76',
        action: 'edit',
        resource: 'Administrativo',
      },
      {
        id: uuidv4(),
        action: 'read',
        resource: 'Administrativo',
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('permissions', null, {});
  },
};
