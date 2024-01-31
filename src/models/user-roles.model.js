const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    static associate(models) {
      this.hasOne(models.User, { as: 'users', foreignKey: 'id' });
      this.hasOne(models.Role, { as: 'roles', foreignKey: 'id' });
    }
  }

  UserRoles.init(
    {
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      roleId: {
        type: DataTypes.UUID,
        references: {
          model: 'Role',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'UserRoles',
      tableName: 'user_roles',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (userRoles) => {
          userRoles.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return UserRoles;
};
