const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    static associate(models) {
      this.belongsTo(models.Client, { as: 'clients', foreignKey: 'clientId' });
      this.belongsTo(models.BillingPriority, { as: 'billingPriorities', foreignKey: 'billingPriorityId' });
    }
  }

  Contract.init(
    {
      clientId: DataTypes.UUID,
      billingPriorityId: DataTypes.UUID,
      beneficiaryName: DataTypes.STRING,
      date: DataTypes.DATE,
      value: DataTypes.FLOAT,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Contract',
      tableName: 'contracts',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (history) => {
          history.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return Contract;
};
