const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const { Action, User, Role, Permission, UserPermissions, UserRoles, sequelize } = require('../models');

const userController = {
  async index(request, response) {
    const transaction = await sequelize.transaction();

    try {
      const users = await User.findAll();

      await transaction.commit();
      return response.status(200).json(users);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return response.status(500).json({ message: 'Server error', error });
    }
  },

  async search(request, response) {
    const transaction = await sequelize.transaction();

    try {
      const { field, value } = request.body;

      const users = await User.findAll({
        include: [
          {
            model: Role,
            as: 'roles',
          },
          {
            model: Permission,
            as: 'permissions',
          },
        ],
        where: sequelize.where(sequelize.col(`User.${field}`), { [Op.like]: `%${value}%` }),
        order: [['name'], ['roles', 'name'], ['permissions', 'resource']],
      });

      await transaction.commit();
      return response.status(200).json(users);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return response.status(500).json({ message: 'Server error', error });
    }
  },

  async simpleSearch(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { value } = req.body;

      const users = await User.findAll({ where: { name: { [Op.like]: `%${value}%` } }, order: ['name'] });

      await transaction.commit();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async store(request, response) {
    const transaction = await sequelize.transaction();

    try {
      const { roles, save, userId } = request.body;

      const exists = await User.findOne({ where: { name: save.username } });

      if (exists) {
        await transaction.rollback();
        return response.status(202).json({ message: 'Login já existente' });
      }

      const user = await User.create({ ...save, password: bcrypt.hashSync(save.password, 10) });

      await roles.map(async (role) => {
        const findRole = await Role.findOne({ where: { name: role.name } });

        const findPermission = await Permission.findOne({
          where: { [Op.and]: [{ resource: role.name }, { action: role.permission }] },
        });

        const userRoleData = {
          userId: user.id,
          roleId: findRole.id,
        };

        const userPermissionData = {
          userId: user.id,
          permissionId: findPermission.id,
        };

        await UserRoles.create(userRoleData);
        await UserPermissions.create(userPermissionData);
      });

      const action = {
        userId,
        action: 'Criou um Usuário',
        reference: user.name,
      };

      await Action.create(action);

      await transaction.commit();
      return response.status(201).json({ message: 'Sucesso ao cadastrar usuário' });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return response.status(500).json({ message: 'Server error', error });
    }
  },

  async update(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { rolesList, save, userId, actualUserId } = req.body;

      // const { roles, permissions, ...user } = await User.findOne({
      const {
        dataValues: { roles, permissions, ...user },
      } = await User.findOne({
        include: [
          {
            model: Role,
            as: 'roles',
          },
          {
            model: Permission,
            as: 'permissions',
          },
        ],
        where: { id: userId },
      });

      if (!user) {
        await transaction.rollback();
        return res.status(404).json({ message: 'Usuário não encontrado:' });
      }

      roles.forEach(async ({ dataValues: { name, user_roles } }) => {
        let canPass = false;

        rolesList.forEach((role) => {
          if (name === role.name) {
            canPass = true;
          }
        });

        if (!canPass) {
          await UserRoles.destroy({
            where: { [Op.and]: [{ roleId: user_roles.dataValues.RoleId }, { userId: user_roles.dataValues.UserId }] },
          });
        }
      });

      rolesList.forEach(async (role) => {
        let isNew = true;

        roles.forEach(({ dataValues: { name } }) => {
          if (role.name === name) {
            isNew = false;
          }
        });

        if (isNew) {
          const {
            dataValues: { id },
          } = await Role.findOne({ where: { name: role.name } });

          const userRolesData = {
            userId,
            roleId: id,
          };

          await UserRoles.create(userRolesData);
        }
      });

      permissions.forEach(async ({ dataValues: { resource, action }, user_permissions }) => {
        let canPass = false;

        rolesList.forEach((role) => {
          const roleAction = role.permission ? 'edit' : 'read';

          if (resource === role.name && roleAction === action) {
            canPass = true;
          }
        });

        if (!canPass) {
          await UserPermissions.destroy({
            where: {
              [Op.and]: [
                { userId: user_permissions.dataValues.UserId },
                { permissionId: user_permissions.dataValues.PermissionId },
              ],
            },
          });
        }
      });

      rolesList.forEach(async (role) => {
        let isNew = true;

        const roleAction = role.permission ? 'edit' : 'read';

        permissions.forEach(({ dataValues: { resource, action } }) => {
          if (role.name === resource && roleAction === action) {
            isNew = false;
          }
        });

        if (isNew) {
          const { dataValues } = await Permission.findOne({
            where: {
              [Op.and]: [{ resource: role.name }, { action: roleAction }],
            },
          });

          const userPermissionData = {
            userId,
            permissionId: dataValues.id,
          };

          await UserPermissions.create(userPermissionData);
        }
      });

      await User.update(
        { ...save, password: save.password === '' ? user.password : bcrypt.hashSync(save.password, 10) },
        { where: { id: userId } },
      );

      const action = {
        userId: actualUserId,
        action: 'Atualizou um Usuário',
        reference: user.name,
      };

      await Action.create(action);

      await transaction.commit();
      return res.status(201).json({ message: 'Sucesso ao Editar usuário' });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async updatePassword(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { id, changePassword } = req.body;

      await User.update({ password: bcrypt.hashSync(changePassword, 10) }, { where: { id } });

      const action = {
        userId: id,
        action: 'Mudou sua senha',
        reference: null,
      };

      await Action.create(action);

      await transaction.commit();
      return res.status(201).json({ message: 'Sucesso ao Editar senha' });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async delete(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { userId, actualUserId, userName } = req.body;
      await User.destroy({ where: { id: userId } });

      const action = {
        userId: actualUserId,
        action: 'Deletou um Usuário',
        reference: userName,
      };

      await Action.create(action);

      await transaction.commit();
      return res.status(200).json({ message: 'Sucesso ao DELETAR Usuário' });
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return res.status(404).json({ message: 'Usuário não encontrado:' });
    }
  },
};

module.exports = userController;
