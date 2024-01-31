const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Specialties extends Model {
    static associate(models) {
      this.hasMany(models.Refund, { as: 'refunds', foreignKey: 'specialtyId' });
    }
  }

  Specialties.init(
    {
      skill: DataTypes.STRING,
      lack: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Specialty',
      tableName: 'specialties',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (specialty) => {
          specialty.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return Specialties;
};
