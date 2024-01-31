const { Bank, Action, sequelize } = require('../models');

const bankController = {
  async index(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const banks = await Bank.findAll({ order: ['bank'] });

      await transaction.commit();
      return res.status(200).json(banks);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async create(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { banks, userId } = req.body;

      const findBanks = await Bank.findAll();

      findBanks.forEach(async ({ dataValues }) => {
        let canPass = false;

        banks.forEach((bank) => {
          if (bank.id === dataValues.id) {
            canPass = true;
          }
        });

        if (!canPass) {
          await Bank.destroy({ where: { id: dataValues.id } });
        }
      });

      banks.forEach(async (bank) => {
        if (bank.id) {
          await Bank.update(bank, { where: { id: bank.id } });
        } else {
          bank.monthly = bank.over; // eslint-disable-line
          await Bank.create(bank);
        }
      });

      const action = {
        userId,
        action: 'Atualizou os Bancos',
        reference: null,
      };

      await Action.create(action);

      await transaction.commit();
      return res.status(200).json({ message: 'Sucesso' });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },
};

module.exports = bankController;
