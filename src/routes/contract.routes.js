const { Router } = require('express');

const contractPriorityController = require('../controllers/contract.controller');

const contractPriorityRoutes = Router();

contractPriorityRoutes.get('/', contractPriorityController.index);

contractPriorityRoutes.post('/post', contractPriorityController.post);

contractPriorityRoutes.post('/findOne', contractPriorityController.findOne);

module.exports = contractPriorityRoutes;
