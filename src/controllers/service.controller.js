const { Op } = require('sequelize');

const { Service, Action, sequelize } = require('../models');

const serviceController = {
  async index(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const services = await Service.findAll();

      await transaction.commit();
      return res.status(200).json(services);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async search(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { field, value } = req.body;

      const services = await Service.findAll({
        where: sequelize.where(sequelize.col(`Service.${field}`), { [Op.like]: `%${value}%` }),
        order: ['company'],
      });

      await transaction.commit();
      return res.status(200).json(services);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async getAllMedics(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const medics = await Service.findAll({
        where: { service: 'Médico' },
        order: ['company'],
      });

      await transaction.commit();
      return res.status(200).json({ medics });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async create(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { service, userId } = req.body;

      const used = await Service.findOne({ where: { company: service.company } });

      if (!used) {
        await Service.create(service);

        const action = {
          userId,
          action: 'Cadastrou um novo serviço',
          reference: service.company,
        };

        await Action.create(action);
        return res.status(200).json({ message: 'Serviço cadastrado com sucesso' });
      }

      await transaction.rollback();
      return res.status(201).json({ message: 'Nome do serviço já em uso' });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async update(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { id, service, userId } = req.body;

      const used = await Service.findOne({ where: { company: service.company } });

      if (!used || used.dataValues.id === id) {
        await Service.update(service, { where: { id } });

        const action = {
          userId,
          action: 'Atualizou um serviço',
          reference: service.company,
        };

        await Action.create(action);
        await transaction.commit();
        return res.status(200).json({ message: 'Serviço atualizado com sucesso' });
      }

      await transaction.rollback();
      return res.status(201).json({ message: 'error' });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },
};

module.exports = serviceController;
