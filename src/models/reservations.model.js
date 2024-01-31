const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      this.belongsTo(models.Client, { as: 'clients', foreignKey: 'clientId' });
    }
  }

  Reservation.init(
    {
      date: DataTypes.DATE,
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
      phone: DataTypes.STRING,
      value: DataTypes.FLOAT,
      payStyle: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Reservation',
      tableName: 'reservations',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (reservation) => {
          reservation.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return Reservation;
};
