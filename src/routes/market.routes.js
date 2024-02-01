const { Router } = require('express');

const marketController = require('../controllers/market.controller');

const marketRoutes = Router();

marketRoutes.get('/', marketController.index);

module.exports = marketRoutes;
