const { Router } = require('express');

const bankController = require('../controllers/bank.controller');

const bankRoutes = Router();

bankRoutes.get('/', bankController.index);

bankRoutes.post('/create', bankController.create);

module.exports = bankRoutes;
