const { Router } = require('express');

const userController = require('../controllers/user.controller');

const userRoutes = Router();

userRoutes.get('/', userController.index);

userRoutes.post('/', userController.store);

userRoutes.post('/search', userController.search);

userRoutes.post('/simpleSearch', userController.simpleSearch);

userRoutes.post('/update', userController.update);

userRoutes.post('/password', userController.updatePassword);

userRoutes.post('/delete', userController.delete);

module.exports = userRoutes;
