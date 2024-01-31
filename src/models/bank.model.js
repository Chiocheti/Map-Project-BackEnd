const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Bank extends Model {
    static associate(models) {
      this.hasMany(models.Bill, { as: 'bills', foreignKey: 'bankId' });
    }
  }

  Bank.init(
    {
      bank: DataTypes.STRING,
      agency: DataTypes.STRING,
      account: DataTypes.FLOAT,
      monthly: DataTypes.FLOAT,
      over: DataTypes.FLOAT,
      reserved: DataTypes.FLOAT,
      application: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Bank',
      tableName: 'banks',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (bank) => {
          bank.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return Bank;
};
