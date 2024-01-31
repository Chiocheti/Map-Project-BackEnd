const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      this.hasMany(models.Address, { as: 'adresses', foreignKey: 'clientId' });
      this.hasMany(models.Dependent, { as: 'dependents', foreignKey: 'clientId' });
      this.hasMany(models.Refund, { as: 'refunds', foreignKey: 'clientId' });
      this.hasMany(models.Contract, { as: 'contracts', foreignKey: 'clientId' });
      this.hasMany(models.Reservation, { as: 'reservations', foreignKey: 'clientId' });
      this.hasMany(models.ClientHistory, { as: 'clientHistory', foreignKey: 'clientId' });
      this.hasMany(models.AssociationHistory, { as: 'associateHistories', foreignKey: 'clientId' });
    }
  }

  Client.init(
    {
      name: DataTypes.STRING,
      cpfNumber: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      admissionDate: DataTypes.DATE,
      email: DataTypes.STRING,
      idCardNumber: DataTypes.STRING,
      issuingAgency: DataTypes.STRING,
      employmentCard: DataTypes.STRING,
      gender: DataTypes.STRING,
      maritalStatus: DataTypes.STRING,
      specialNeeds: DataTypes.STRING,
      appPermission: DataTypes.STRING,
      educationLevel: DataTypes.STRING,
      sendJournal: DataTypes.STRING,
      details: DataTypes.STRING,
      annualCredit: DataTypes.STRING,
      monthlyCredit: DataTypes.STRING,
      phone01: DataTypes.STRING,
      phone02: DataTypes.STRING,
      phone03: DataTypes.STRING,
      bankAccount: DataTypes.STRING,
      bankAgency: DataTypes.STRING,
      bankCode: DataTypes.STRING,
      companyCode: DataTypes.STRING,
      baseSalary: DataTypes.FLOAT,
      discount: DataTypes.FLOAT,
      associate: DataTypes.STRING,
      associateState: DataTypes.STRING,
      hiringDate: DataTypes.DATE,
      dismissalDate: DataTypes.DATE,
      retirementDate: DataTypes.DATE,
      ente: DataTypes.STRING,
      monthlyType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Client',
      tableName: 'clients',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (client) => {
          client.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return Client;
};
