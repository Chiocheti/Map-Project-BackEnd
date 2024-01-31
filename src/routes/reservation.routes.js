const { Router } = require('express');

const reservationController = require('../controllers/reservation.controller');

const reservationRoutes = Router();

reservationRoutes.get('/', reservationController.index);

reservationRoutes.post('/update', reservationController.update);

reservationRoutes.post('/delete', reservationController.delete);

module.exports = reservationRoutes;
