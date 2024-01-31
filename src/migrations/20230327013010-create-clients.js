/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clients', {
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
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cpf_number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      birthdate: {
        allowNull: true,
        type: Sequelize.DATE,
        validate: {
          isDate: true,
        },
      },
      admission_date: {
        allowNull: true,
        type: Sequelize.DATE,
        validate: {
          isDate: true,
        },
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },
      id_card_number: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      issuing_agency: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      employment_card: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      gender: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      marital_status: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      special_needs: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      app_permission: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      education_level: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      details: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      send_journal: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      monthly_credit: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      annual_credit: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone01: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      phone02: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      phone03: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      bank_account: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      bank_agency: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      bank_code: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      company_code: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      base_salary: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      discount: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      associate: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      associate_state: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      hiring_date: {
        allowNull: true,
        type: Sequelize.DATE,
        validate: {
          isDate: true,
        },
      },
      dismissal_date: {
        allowNull: true,
        type: Sequelize.DATE,
        validate: {
          isDate: true,
        },
      },
      retirement_date: {
        allowNull: true,
        type: Sequelize.DATE,
        validate: {
          isDate: true,
        },
      },
      ente: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      monthly_type: {
        allowNull: true,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('clients');
  },
};
