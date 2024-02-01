// const { Op } = require('sequelize');

const { Market, sequelize } = require('../models');

const actionController = {
  async index(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const markets = await Market.findAll();

      await transaction.commit();
      return res.status(200).json(markets);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },
};

module.exports = actionController;
