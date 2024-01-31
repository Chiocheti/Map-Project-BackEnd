const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      this.belongsToMany(models.Role, { through: 'role_permissions', as: 'roles' });
      this.belongsToMany(models.User, { through: 'user_permissions', as: 'users' });
    }
  }

  Permission.init(
    {
      action: DataTypes.STRING,
      resource: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Permission',
      tableName: 'permissions',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (permission) => {
          permission.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return Permission;
};
