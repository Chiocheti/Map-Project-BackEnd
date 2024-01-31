const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class RolePermissions extends Model {
    static associate(models) {
      this.hasOne(models.Role, { as: 'roles', foreignKey: 'id' });
      this.hasOne(models.Permission, { as: 'permissions', foreignKey: 'id' });
    }
  }

  RolePermissions.init(
    {
      roleId: {
        type: DataTypes.UUID,
        references: {
          model: 'Role',
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
      modelName: 'RolePermissions',
      tableName: 'role_permissions',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (rolePermissions) => {
          rolePermissions.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return RolePermissions;
};
