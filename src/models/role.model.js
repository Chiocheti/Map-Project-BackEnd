const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.belongsToMany(models.Permission, { through: 'role_permissions', as: 'permissions' });
      this.belongsToMany(models.User, { through: 'user_roles', as: 'users' });
    }
  }

  Role.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (role) => {
          role.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return Role;
};
