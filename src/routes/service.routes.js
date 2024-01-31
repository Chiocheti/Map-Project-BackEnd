const { Router } = require('express');

const serviceController = require('../controllers/service.controller');

const serviceRoutes = Router();

serviceRoutes.get('/', serviceController.index);

serviceRoutes.get('/getAllMedics', serviceController.getAllMedics);

serviceRoutes.post('/create', serviceController.create);

serviceRoutes.post('/update', serviceController.update);

serviceRoutes.post('/search', serviceController.search);

module.exports = serviceRoutes;
