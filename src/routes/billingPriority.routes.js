const { Router } = require('express');

const billingPriorityController = require('../controllers/billingPriority.controller');

const billingPriorityRoutes = Router();

billingPriorityRoutes.get('/', billingPriorityController.index);

billingPriorityRoutes.get('/getPriorities', billingPriorityController.getPriorities);

module.exports = billingPriorityRoutes;
