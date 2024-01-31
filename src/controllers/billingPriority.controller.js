const { BillingPriority, sequelize } = require('../models');

const billingPriorityController = {
  async index(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const billingPriorities = await BillingPriority.findAll({
        order: ['value'],
      });

      const list = [];

      billingPriorities.forEach((element) => {
        list.push({ text: `${element.value} - ${element.name}`, value: element.id });
      });

      await transaction.commit();
      return res.status(200).json({ list, billingPriorities });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async getPriorities(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const billingPriorities = await BillingPriority.findAll({
        order: ['value'],
      });

      await transaction.commit();
      return res.status(200).json(billingPriorities);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },
};

module.exports = billingPriorityController;
