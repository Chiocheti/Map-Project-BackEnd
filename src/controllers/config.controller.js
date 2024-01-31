const { Action, Config, Client, sequelize } = require('../models');

const configController = {
  async index(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const configs = await Config.findOne();

      await transaction.commit();
      return res.status(200).json(configs);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async update(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { id, config, userId } = req.body;

      await Config.update(config, { where: { id } });

      const action = {
        userId,
        action: 'Atualizou as onfigurações',
        reference: null,
      };

      await Action.create(action);

      await transaction.commit();
      return res.status(200).json({ message: 'Atualizado com sucesso' });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async resetMonth(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { value } = req.body;

      if (value) {
        const clients = await Client.findAll();

        clients.forEach(async ({ dataValues }) => {
          await Client.update({ monthlyCredit: 175 }, { where: { id: dataValues.id } });
        });
      }

      await Config.update({ actualized_monthly_credit: value }, { where: {} });

      await transaction.commit();
      return res.status(200).json({ message: 'Atualizado com sucesso' });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error: ', error });
    }
  },

  async resetAnnual(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { value } = req.body;

      if (value) {
        const clients = await Client.findAll();

        clients.forEach(async ({ dataValues }) => {
          await Client.update({ annualCredit: 175 }, { where: { id: dataValues.id } });
        });
      }

      await Config.update({ actualized_annual_credit: value }, { where: {} });

      await transaction.commit();
      return res.status(200).json({ data: `Ano Atualizado` });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error: ', error });
    }
  },
};

module.exports = configController;
