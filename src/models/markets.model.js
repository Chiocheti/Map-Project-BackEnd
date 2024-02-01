const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Market extends Model {
    // static associate(models) {
    //   // this.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    // }
  }

  Market.init(
    {
      lat: DataTypes.UUID,
      lgn: DataTypes.STRING,
      description: DataTypes.STRING,
      priority: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Market',
      tableName: 'markets',
      underscored: true,
      timestamps: true,
      hooks: {
        beforeCreate: (market) => {
          market.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return Market;
};
