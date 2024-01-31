const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    static associate(models) {
      this.belongsTo(models.Bank, { as: 'banks', foreignKey: 'bankId' });
    }
  }

  Bill.init(
    {
      bankId: DataTypes.UUID,
      referenceId: DataTypes.UUID,
      clientName: DataTypes.STRING,
      date: DataTypes.DATE,
      confirmationDate: DataTypes.DATE,
      doc: DataTypes.STRING,
      value: DataTypes.FLOAT,
      dca: DataTypes.STRING,
      status: DataTypes.STRING,
      order: DataTypes.STRING,
      details: DataTypes.STRING,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Bill',
      tableName: 'bills',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (bill) => {
          bill.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return Bill;
};
