const { Op } = require('sequelize');

const { Action, User, sequelize } = require('../models');

const actionController = {
  async index(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const actions = await Action.findAll();

      await transaction.commit();
      return res.status(200).json(actions);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async simpleSearch(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { value } = req.body;

      const reference = await Action.findAll({
        where: { reference: { [Op.like]: `%${value}%` } },
        order: ['reference'],
        attributes: ['reference'],
        group: ['reference'],
      });

      const fullReference = [];

      reference.forEach((element) => {
        fullReference.push({
          id: element.reference,
          name: element.reference,
        });
      });

      await transaction.commit();
      return res.status(200).json(fullReference);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async search(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { id, field, month } = req.body;

      let newActionsArray = [];
      let oldActionsArray = [];

      if (field === 'userId') {
        newActionsArray = await Action.findAll({
          where: { created_at: { [Op.gte]: month }, userId: id },
          order: [['created_at', 'DESC']],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['name'],
            },
          ],
        });

        oldActionsArray = await Action.findAll({
          where: { created_at: { [Op.lt]: month }, userId: id },
          order: [['created_at', 'DESC']],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['name'],
            },
          ],
        });
      } else {
        newActionsArray = await Action.findAll({
          where: { created_at: { [Op.gte]: month }, reference: id },
          order: [['created_at', 'DESC']],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['name'],
            },
          ],
        });

        oldActionsArray = await Action.findAll({
          where: { created_at: { [Op.lte]: month }, reference: id },
          order: [['created_at', 'DESC']],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['name'],
            },
          ],
        });
      }

      await transaction.commit();
      return res.status(200).json({ newActionsArray, oldActionsArray });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },
};

module.exports = actionController;
