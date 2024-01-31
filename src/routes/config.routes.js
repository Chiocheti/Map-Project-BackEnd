const { Router } = require('express');

const configController = require('../controllers/config.controller');

const configRoutes = Router();

configRoutes.get('/', configController.index);

configRoutes.post('/month', configController.resetMonth);

configRoutes.post('/annual', configController.resetAnnual);

configRoutes.post('/update', configController.update);

module.exports = configRoutes;
