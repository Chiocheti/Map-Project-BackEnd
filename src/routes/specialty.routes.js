const { Router } = require('express');

const specialtyController = require('../controllers/specialty.controller');

const specialtyRoutes = Router();

specialtyRoutes.get('/', specialtyController.index);

specialtyRoutes.get('/list', specialtyController.getList);

specialtyRoutes.get('/getAll', specialtyController.getAll);

specialtyRoutes.post('/save', specialtyController.save);

module.exports = specialtyRoutes;
