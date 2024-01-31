const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class BillingPriority extends Model {
    static associate(models) {
      this.hasMany(models.Contract, { as: 'contracts', foreignKey: 'billingPriorityId' });
    }
  }

  BillingPriority.init(
    {
      name: DataTypes.STRING,
      value: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'BillingPriority',
      tableName: 'billing_priorities',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (billing) => {
          billing.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return BillingPriority;
};
