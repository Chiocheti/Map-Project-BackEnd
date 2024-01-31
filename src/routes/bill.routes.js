const { Router } = require('express');

const billController = require('../controllers/bill.controller');

const billRoutes = Router();

billRoutes.get('/', billController.index);

billRoutes.get('/getMaxBills', billController.getMaxBills);

billRoutes.post('/getBills', billController.getBills);

billRoutes.post('/getClientBills', billController.getClientBills);

billRoutes.post('/getServiceBills', billController.getServiceBills);

billRoutes.post('/update', billController.update);

module.exports = billRoutes;
