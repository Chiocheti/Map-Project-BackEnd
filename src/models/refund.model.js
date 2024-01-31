const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Refund extends Model {
    static associate(models) {
      this.belongsTo(models.Client, { as: 'clients', foreignKey: 'clientId' });
      this.belongsTo(models.Dependent, { as: 'dependents', foreignKey: 'dependentId' });
      this.belongsTo(models.Specialty, { as: 'specialties', foreignKey: 'specialtyId' });
    }
  }

  Refund.init(
    {
      order: DataTypes.INTEGER,
      invoiceReceived: DataTypes.DATE,
      invoiceValue: DataTypes.FLOAT,
      refundValue: DataTypes.FLOAT,
      specialtyId: DataTypes.UUID,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Refund',
      tableName: 'refunds',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (refund) => {
          refund.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return Refund;
};
