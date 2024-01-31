const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    // static associate(models) {
    //   this.hasMany(models.Refund, { as: 'refunds', foreignKey: 'serviceId' });
    // }
  }

  Services.init(
    {
      company: DataTypes.STRING,
      service: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      mail: DataTypes.STRING,
      phone01: DataTypes.STRING,
      phone02: DataTypes.STRING,
      phone03: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Service',
      tableName: 'services',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (service) => {
          service.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return Services;
};
