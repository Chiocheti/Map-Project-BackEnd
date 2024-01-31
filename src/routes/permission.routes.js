const { Router } = require('express');

const permissionController = require('../controllers/permission.controller');

const permissionRoutes = Router();

permissionRoutes.get('/', permissionController.index);

permissionRoutes.post('/', permissionController.store);

module.exports = permissionRoutes;
