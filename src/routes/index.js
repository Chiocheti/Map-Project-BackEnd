const { Router } = require('express');

const authenticate = require('../middlewares/auth');

const router = Router();

const actionRoutes = require('./action.routes');
const authRoutes = require('./auth.routes');
const bankRoutes = require('./bank.routes');
const billRoutes = require('./bill.routes');
const billingPriorityRoutes = require('./billingPriority.routes');
const clientRoutes = require('./client.routes');
const configRoutes = require('./config.routes');
const contractRoutes = require('./contract.routes');
const permissionRoutes = require('./permission.routes');
const reportRoutes = require('./report.routes');
const reservationRoutes = require('./reservation.routes');
const roleRoutes = require('./role.routes');
const serviceRoutes = require('./service.routes');
const specialtyRoutes = require('./specialty.routes');
const userRoutes = require('./user.routes');

router.use('/actions', authenticate, actionRoutes);
router.use('/', authRoutes);
router.use('/banks', authenticate, bankRoutes);
router.use('/bills', authenticate, billRoutes);
router.use('/billingPriorities', authenticate, billingPriorityRoutes);
router.use('/clients', authenticate, clientRoutes);
router.use('/configs', authenticate, configRoutes);
router.use('/contracts', authenticate, contractRoutes);
router.use('/permissions', authenticate, permissionRoutes);
router.use('/report', authenticate, reportRoutes);
router.use('/reservations', authenticate, reservationRoutes);
router.use('/roles', authenticate, roleRoutes);
router.use('/services', authenticate, serviceRoutes);
router.use('/specialties', authenticate, specialtyRoutes);
router.use('/users', authenticate, userRoutes);

module.exports = router;
