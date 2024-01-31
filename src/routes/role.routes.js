const { Router } = require('express');

const roleController = require('../controllers/role.controller');

const roleRoutes = Router();

roleRoutes.get('/', roleController.index);

roleRoutes.post('/', roleController.store);

module.exports = roleRoutes;
