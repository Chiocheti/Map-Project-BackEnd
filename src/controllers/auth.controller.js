const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, Role, Permission, Action, sequelize } = require('../models');

const ACCESS_TOKEN_DURATION = '7d';
const REFRESH_TOKEN_DURATION = '30d';

const clientController = {
  async signIn(request, response) {
    const transaction = await sequelize.transaction();

    try {
      const { username, password } = request.body;
      console.log(`Username: ${username}`);
      console.log(`Password: ${password}`);

      const { roles, permissions, ...user } = await User.findOne({
        include: [
          {
            model: Role,
            as: 'roles',
            attributes: {
              exclude: ['id'],
            },
          },
          {
            model: Permission,
            as: 'permissions',
            attributes: {
              exclude: ['id'],
            },
          },
        ],
        where: { username },
        order: [['name'], ['roles', 'name'], ['permissions', 'resource']],
      });

      const { dataValues } = user;

      if (!dataValues) {
        await transaction.rollback();
        return response.status(401).json({ error: 'Usuário ou senha incorretos' });
      }

      const isPasswordMatch = await bcrypt.compare(password, dataValues.password);

      if (!isPasswordMatch) {
        await transaction.rollback();
        return response.status(401).json({ error: 'Usuário ou senha incorretos' });
      }

      const rolesList = [];

      roles.forEach((element) => {
        rolesList.push(element.name);
      });

      const permissionsList = [];

      permissions.forEach((element) => {
        permissionsList.push({ action: element.action, resource: element.resource });
      });

      const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: ACCESS_TOKEN_DURATION,
      });

      const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: REFRESH_TOKEN_DURATION,
      });

      await User.update({ refreshToken }, { where: { id: dataValues.id } });

      console.log(
        JSON.stringify({
          user: {
            id: dataValues.id,
            name: dataValues.name,
            phone: dataValues.phone,
            roles: rolesList,
            permissions: permissionsList,
          },
        }),
      );

      const action = {
        userId: dataValues.id,
        action: 'Usuário fez Login',
        reference: null,
      };

      await Action.create(action);

      await transaction.commit();
      return response.status(201).json({
        accessToken,
        refreshToken,
        user: {
          id: dataValues.id,
          name: dataValues.name,
          phone: dataValues.phone,
          roles: rolesList,
          permissions: permissionsList,
        },
      });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return response.status(500).json({ message: 'Server error', error });
    }
  },

  async logout(request, response) {
    const transaction = await sequelize.transaction();
    try {
      const { userId } = request.body;
      const user = await User.findOne({
        where: { id: userId },
      });

      if (!user) {
        await transaction.rollback();
        return response.status(401).json({ error: 'Usuário não encontrado' });
      }

      await user.update({ refreshToken: null });

      const action = {
        userId: user.dataValues.id,
        action: 'Usuário fez Logout',
        reference: null,
      };

      await Action.create(action);

      await transaction.commit();
      return response.json({ message: 'Deslogado com sucesso' });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return response.status(500).json({ message: 'Server error', error });
    }
  },

  async refreshToken(request, response) {
    const transaction = await sequelize.transaction();

    try {
      const { refreshToken } = request.body;

      const decoded = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);

      const user = await User.findOne({
        where: { id: decoded.id },
      });

      if (!user || refreshToken !== user.refreshToken) {
        await transaction.rollback();
        return response.status(401).json({ error: 'Requisição não autorizada' });
      }

      const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: ACCESS_TOKEN_DURATION,
      });

      await transaction.commit();
      return response.status(201).json({
        accessToken,
      });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return response.status(500).json({ message: 'Server error', error });
    }
  },
};

module.exports = clientController;
