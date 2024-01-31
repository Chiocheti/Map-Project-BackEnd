const { BillingPriority, Client, Company, Contract, sequelize } = require('../models');

const contractController = {
  async index(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const contracts = await Contract.findAll();

      await transaction.commit();
      return res.status(200).json(contracts);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async post(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { contract } = req.body;

      let findClient = null;

      if (!contract.clientCpf) {
        findClient = await Client.findOne({
          where: { name: contract.clientName },
          include: [
            {
              model: Company,
              as: 'companies',
              attributes: {
                exclude: ['clientId'],
              },
              where: { companyCode: contract.companyCode },
            },
          ],
        });
      } else {
        findClient = await Client.findOne({
          where: { name: contract.clientName, cpfNumber: contract.clientCpf },
        });
      }

      if (!findClient) {
        await transaction.commit();
        return res.status(200).json({ status: false });
      }

      contract.clientId = findClient.dataValues.id;

      await Contract.create(contract);

      await transaction.commit();
      return res.status(200).json({ status: true });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async findOne(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { clientId } = req.body;

      const contracts = await Contract.findAll({
        where: { clientId },
        include: [
          {
            model: BillingPriority,
            as: 'billingPriorities',
            attributes: ['name', 'value'],
          },
        ],
      });

      await transaction.commit();
      return res.status(200).json(contracts);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },
};

module.exports = contractController;
