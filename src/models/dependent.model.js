const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Dependent extends Model {
    static associate(models) {
      this.belongsTo(models.Client, { foreignKey: 'clientId' });
      this.hasMany(models.Refund, { as: 'refunds', foreignKey: 'dependentId' });
    }
  }

  Dependent.init(
    {
      order: DataTypes.INTEGER,
      name: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      gender: DataTypes.STRING,
      relationship: DataTypes.STRING,
      documents: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Dependent',
      tableName: 'dependents',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (dependent) => {
          dependent.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return Dependent;
};
