const { Router } = require('express');

const authController = require('../controllers/auth.controller');
const authenticate = require('../middlewares/auth');

const authRoutes = Router();

authRoutes.post('/login', authController.signIn);

authRoutes.put('/logout', authenticate, authController.logout);

authRoutes.post('/refresh-token', authController.refreshToken);

module.exports = authRoutes;
