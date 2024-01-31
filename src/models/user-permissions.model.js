const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class UserPermissions extends Model {
    static associate(models) {
      this.hasOne(models.User, { as: 'users', foreignKey: 'id' });
      this.hasOne(models.Permission, { as: 'permissions', foreignKey: 'id' });
    }
  }

  UserPermissions.init(
    {
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      permissionId: {
        type: DataTypes.UUID,
        references: {
          model: 'Permission',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'UserPermissions',
      tableName: 'user_permissions',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (userPermissions) => {
          userPermissions.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return UserPermissions;
};
