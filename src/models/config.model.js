const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Config extends Model {
    // static associate(models) {
    // }
  }

  Config.init(
    {
      amount: DataTypes.FLOAT,
      check_number: DataTypes.INTEGER,
      receiver_number: DataTypes.INTEGER,
      actualized_monthly_credit: DataTypes.BOOLEAN,
      actualized_annual_credit: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Config',
      tableName: 'configs',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (config) => {
          config.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return Config;
};
