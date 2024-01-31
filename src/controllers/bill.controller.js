const { Op } = require('sequelize');

const { Bill, Bank, Action, Client, Config, Dependent, Refund, Specialty, sequelize } = require('../models');

const billController = {
  async index(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const banks = await Bill.findAll();

      await transaction.commit();
      return res.status(200).json(banks);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async getBills(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { start, end } = req.body;

      const bills = await Bill.findAll({
        where: { date: { [Op.between]: [start, end] } },
        include: [
          {
            model: Bank,
            as: 'banks',
            attributes: ['bank'],
          },
        ],
        order: [['date', 'DESC']],
      });

      bills.forEach(async (bill) => {
        bill.dataValues.account = bill.dataValues.banks.dataValues.bank; // eslint-disable-line
      });

      await transaction.commit();
      return res.status(200).json(bills);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async getMaxBills(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const max = await Bill.max('doc');

      const config = await Config.findOne({ attributes: ['check_number', 'receiver_number'] });

      await transaction.commit();
      return res.status(200).json({ max, config });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async getClientBills(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { clientId, start } = req.body;

      const bills = await Bill.findAll({
        where: { referenceId: clientId, date: { [Op.gte]: start } },
        order: [['date', 'DESC']],
      });

      const otherRefunds = await Client.findOne({
        attributes: ['name'],
        where: {
          id: clientId,
        },
        include: [
          {
            model: Refund,
            as: 'refunds',
            required: false,
            attributes: {
              exclude: ['clientId'],
            },
            where: {
              invoiceReceived: { [Op.lt]: start },
            },
            include: [
              {
                model: Specialty,
                as: 'specialties',
                attributes: {
                  exclude: ['id'],
                },
              },
              {
                model: Dependent,
                as: 'dependents',
                attributes: ['name'],
              },
            ],
          },
        ],
        order: [['refunds', 'invoiceReceived', 'ASC']],
      });

      const refunds = await Client.findOne({
        attributes: ['name'],
        where: {
          id: clientId,
        },
        include: [
          {
            model: Refund,
            as: 'refunds',
            required: false,
            attributes: {
              exclude: ['clientId'],
            },
            where: {
              invoiceReceived: { [Op.gte]: start },
            },
            include: [
              {
                model: Specialty,
                as: 'specialties',
                attributes: {
                  exclude: ['id'],
                },
              },
              {
                model: Dependent,
                as: 'dependents',
                attributes: ['name'],
              },
            ],
          },
        ],
        order: [['refunds', 'invoiceReceived', 'DESC']],
      });

      await transaction.commit();
      return res.status(200).json({ bills, refunds, otherRefunds });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async getServiceBills(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { clientName } = req.body;

      const bills = await Bill.findAll({
        where: { clientName },
        order: [['date', 'ASC']],
      });

      await transaction.commit();
      return res.status(200).json(bills);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async update(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { updateBills, createBills, banks, userId } = req.body;

      const order = await Bill.max('order');

      createBills.forEach(async (bill, index) => {
        bill.order = order !== null ? order + index + 1: index; // eslint-disable-line

        await Bill.create(bill);
      });

      updateBills.forEach(async (bill) => {
        const findBill = await Bill.findOne({ where: { id: bill.id } });

        await Bill.update(bill, { where: { id: findBill.id } });
      });

      banks.forEach(async (bank) => {
        await Bank.update(bank, { where: { id: bank.id } });
      });

      const action = {
        userId,
        action: 'Atualizou a lista de pagamentos',
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

module.exports = billController;
