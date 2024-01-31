const { Router } = require('express');

const reportController = require('../controllers/report.controller');

const reportRoutes = Router();

reportRoutes.post('/', reportController.report);

reportRoutes.post('/refundReport', reportController.refundReport);

reportRoutes.post('/contractReport', reportController.contractReport);

reportRoutes.post('/textReport', reportController.textReport);

reportRoutes.post('/billsReport', reportController.billsReport);

module.exports = reportRoutes;
