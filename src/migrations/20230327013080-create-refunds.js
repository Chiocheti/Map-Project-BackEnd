/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('refunds', {
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
      client_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'clients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      dependent_id: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'dependents',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      specialty_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'specialties',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      order: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      invoice_received: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      invoice_value: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      refund_value: {
        allowNull: false,
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('refunds');
  },
};
