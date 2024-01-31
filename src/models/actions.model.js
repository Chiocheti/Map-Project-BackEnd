const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    }
  }

  Action.init(
    {
      userId: DataTypes.UUID,
      action: DataTypes.STRING,
      reference: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Action',
      tableName: 'actions',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (action) => {
          action.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return Action;
};
