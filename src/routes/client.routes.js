const { Router } = require('express');

const clientController = require('../controllers/client.controller');

const clientRoutes = Router();

clientRoutes.get('/', clientController.index);

clientRoutes.get('/clientList', clientController.clientList);

clientRoutes.get('/allClientList', clientController.allClientList);

clientRoutes.get('/clientIdList', clientController.clientIdList);

clientRoutes.get('/findClientsBanks', clientController.findClientsBanks);

clientRoutes.get('/getEveryOne', clientController.getEveryOne);

clientRoutes.post('/', clientController.store);

clientRoutes.post('/storeRefund', clientController.storeRefund);

clientRoutes.post('/search', clientController.search);

clientRoutes.post('/searchRefunds', clientController.searchRefunds);

clientRoutes.post('/findClientsAssociationHistory', clientController.findClientsAssociationHistory);

clientRoutes.post('/simpleSearch', clientController.simpleSearch);

clientRoutes.post('/findByName', clientController.findByName);

clientRoutes.post('/findInformation', clientController.findClientInformation);

clientRoutes.post('/update', clientController.update);

clientRoutes.post('/remoteUpdate', clientController.remoteUpdate);

clientRoutes.post('/remoteInsert', clientController.remoteInsert);

clientRoutes.post('/remoteUpdateDependent', clientController.remoteUpdateDependent);

clientRoutes.post('/removeClientById', clientController.removeClientById);

module.exports = clientRoutes;
