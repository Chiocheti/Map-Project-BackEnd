/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('roles', [
      {
        id: '0edab452-656d-4fc0-b16e-3548e2cd98a5',
        name: 'Administrativo',
      },
      {
        id: '3081af08-331e-405f-992b-faeed163184c',
        name: 'Financeiro',
      },
      {
        id: '148237cf-380b-4640-a945-9448e6e8fe4a',
        name: 'Setor de Sócios',
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
