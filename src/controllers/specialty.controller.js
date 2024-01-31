const { Action, Specialty, sequelize } = require('../models');

const actionController = {
  async index(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const specialties = await Specialty.findAll({ order: ['skill'] });

      await transaction.commit();
      return res.status(200).json(specialties);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async getAll(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const specialties = await Specialty.findAll({
        order: ['skill'],
        attributes: ['skill', 'id'],
      });

      const list = [];

      specialties.forEach((element) => {
        list.push({
          text: element.dataValues.skill,
          value: element.dataValues.id,
        });
      });

      await transaction.commit();
      return res.status(200).json(list);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async getList(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const specialties = await Specialty.findAll({ order: ['skill'] });

      const list = [];
      const idList = [];

      specialties.forEach((element) => {
        list.push(element.dataValues.skill);
        idList.push({
          name: element.dataValues.skill,
          id: element.dataValues.id,
          lack: element.dataValues.lack,
        });
      });

      await transaction.commit();
      return res.status(200).json({ list, idList });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async save(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { specialties, userId } = req.body;
      const findSpecialties = await Specialty.findAll();

      findSpecialties.forEach(async ({ dataValues: { id } }) => {
        let canPass = false;

        specialties.forEach((specialty) => {
          if (id === specialty.id) {
            canPass = true;
          }
        });

        if (!canPass) {
          await Specialty.destroy({ where: { id } });
        }
      });

      specialties.forEach(async (specialty) => {
        if (!specialty.id) {
          await Specialty.create(specialty);
        } else {
          const find = await Specialty.findOne({ where: { id: specialty.id } });

          if (find) {
            await Specialty.update(specialty, { where: { id: specialty.id } });
          }
        }
      });

      const action = {
        userId,
        action: 'Atualizou a lista de especialidades',
        reference: null,
      };

      await Action.create(action);

      await transaction.commit();
      return res.status(200).json({ message: 'Lista atualizada' });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },
};

module.exports = actionController;
