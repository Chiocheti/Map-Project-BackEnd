const { Router } = require('express');

const actionController = require('../controllers/action.controller');

const actionRoutes = Router();

actionRoutes.get('/', actionController.index);

actionRoutes.post('/search', actionController.search);

actionRoutes.post('/simpleSearch', actionController.simpleSearch);

module.exports = actionRoutes;
