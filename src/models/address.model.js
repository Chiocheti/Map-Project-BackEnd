const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      this.belongsTo(models.Client, { foreignKey: 'clientId' });
    }
  }

  Address.init(
    {
      order: DataTypes.INTEGER,
      postalCode: DataTypes.STRING,
      streetName: DataTypes.STRING,
      number: DataTypes.STRING,
      complement: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Address',
      tableName: 'adresses',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (address) => {
          address.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return Address;
};
