const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Permission, { through: 'user_permissions', as: 'permissions' });
      this.belongsToMany(models.Role, { through: 'user_roles', as: 'roles' });
      this.hasMany(models.Action, { as: 'actionsList', foreignKey: 'userId' });
    }
  }

  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      refreshToken: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (user) => {
          user.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return User;
};
