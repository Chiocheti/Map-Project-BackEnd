/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('configs', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        validate: {
          isUUID: 4,
        },
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      check_number: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      receiver_number: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      actualized_monthly_credit: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      actualized_annual_credit: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('configs');
  },
};
