const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class ClientHistory extends Model {
    static associate(models) {
      this.belongsTo(models.Client, { foreignKey: 'clientId' });
    }
  }

  ClientHistory.init(
    {
      company: DataTypes.STRING,
      code: DataTypes.STRING,
      order: DataTypes.STRING,
      admissionDate: DataTypes.DATE,
      dismissalDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'ClientHistory',
      tableName: 'client_history',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (history) => {
          history.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return ClientHistory;
};
