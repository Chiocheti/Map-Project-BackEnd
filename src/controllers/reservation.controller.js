const { Op } = require('sequelize');

const { Reservation, Client, sequelize } = require('../models');

const reservationController = {
  async index(req, res) {
    const transaction = await sequelize.transaction();
    const today = new Date();

    try {
      const reservations = await Reservation.findAll({
        include: [
          {
            model: Client,
            as: 'clients',
            attributes: ['name', 'cpfNumber'],
            include: [
              {
                model: Reservation,
                as: 'reservations',
                attributes: ['pay_style'],
                where: {
                  date: {
                    [Op.between]: [
                      new Date(`${today.getFullYear()}-01-01`),
                      new Date(`${today.getFullYear() + 1}-01-01`),
                    ],
                  },
                },
              },
            ],
          },
        ],
        where: { pay_style: { [Op.ne]: 'Cancelado' } },
      });

      await transaction.commit();
      return res.status(200).json(reservations);
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async update(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const {
        data: { id, ...data },
      } = req.body;

      let reservation = null;

      if (id) {
        reservation = await Reservation.update(data, { where: { id } });
      } else {
        reservation = await Reservation.create(data);
      }
      await transaction.commit();

      return res.status(200).json(reservation);
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async delete(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { id } = req.body;

      const reservation = await Reservation.destroy({ where: { id } });

      await transaction.commit();

      return res.status(200).json(reservation);
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      return res.status(500).json({ message: 'Server error', error });
    }
  },
};

module.exports = reservationController;
