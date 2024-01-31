const { Op } = require('sequelize');

const {
  Action,
  Address,
  AssociationHistory,
  Client,
  ClientHistory,
  Dependent,
  Refund,
  Reservation,
  Service,
  sequelize,
} = require('../models');

const clientController = {
  async index(request, response) {
    const transaction = await sequelize.transaction();

    try {
      const clients = await Client.findAll({
        include: [
          {
            model: Address,
            as: 'adresses',
            attributes: {
              exclude: ['clientId'],
            },
          },
          {
            model: Dependent,
            as: 'dependents',
            attributes: {
              exclude: ['clientId'],
            },
          },
          {
            model: Refund,
            as: 'refunds',
            attributes: {
              exclude: ['clientId'],
            },
          },
          {
            model: ClientHistory,
            as: 'client_history',
            attributes: {
              exclude: ['clientId'],
            },
          },
        ],
        order: [
          ['adresses', 'order', 'ASC'],
          ['dependents', 'order', 'ASC'],
          ['refunds', 'order', 'ASC'],
          ['clientHistory', 'order', 'ASC'],
        ],
      });

      await transaction.commit();
      return response.status(200).json(clients);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return response.status(500).json({ message: 'Server error', error });
    }
  },

  async getEveryOne(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const clients = await Client.findAll({
        attributes: ['id', 'name', 'cpfNumber', 'associate', 'associateState'],
        order: ['name'],
      });

      await transaction.commit();
      return res.status(200).json(clients);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async search(request, response) {
    const transaction = await sequelize.transaction();

    try {
      const { field, value } = request.body;

      let clients = [];

      if (field === 'company_code') {
        clients = await Client.findAll({
          include: [
            {
              model: Address,
              as: 'adresses',
              attributes: {
                exclude: ['clientId'],
              },
            },
            {
              model: Dependent,
              as: 'dependents',
              attributes: {
                exclude: ['clientId'],
              },
            },
            {
              model: ClientHistory,
              as: 'clientHistory',
              attributes: {
                exclude: ['clientId'],
              },
            },
          ],
          where: { companyCode: value },
          order: [
            ['name'],
            ['adresses', 'order', 'ASC'],
            ['dependents', 'order', 'ASC'],
            ['clientHistory', 'order', 'ASC'],
          ],
        });
      } else {
        clients = await Client.findAll({
          include: [
            {
              model: Address,
              as: 'adresses',
              attributes: {
                exclude: ['clientId'],
              },
            },
            {
              model: Dependent,
              as: 'dependents',
              attributes: {
                exclude: ['clientId'],
              },
            },
            {
              model: ClientHistory,
              as: 'clientHistory',
              attributes: {
                exclude: ['clientId'],
              },
            },
          ],
          where: sequelize.where(sequelize.col(`Client.${field}`), { [Op.like]: `%${value}%` }),
          order: [
            ['name'],
            ['adresses', 'order', 'ASC'],
            ['dependents', 'order', 'ASC'],
            ['clientHistory', 'order', 'ASC'],
          ],
        });
      }

      await transaction.commit();
      return response.status(200).json(clients);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return response.status(500).json({ message: 'Server error', error });
    }
  },

  async clientList(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const clients = await Client.findAll({
        attributes: ['name', 'cpfNumber', 'id'],
        order: ['name'],
        where: { associateState: 'ASSOCIADO' },
      });

      const services = await Service.findAll({
        attributes: ['company', 'id'],
        order: ['company'],
      });

      await transaction.commit();
      return res.status(200).json({ clients, services });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async allClientList(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const clients = await Client.findAll({
        attributes: ['name', 'cpfNumber', 'id'],
        order: ['name'],
      });

      const services = await Service.findAll({
        attributes: ['company', 'id'],
        order: ['company'],
      });

      await transaction.commit();
      return res.status(200).json({ clients, services });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async clientIdList(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const clients = await Client.findAll({
        attributes: ['name', 'id'],
        order: ['name'],
      });

      const clientsList = [];
      const clientsIdList = [];

      clients.forEach((client) => {
        clientsList.push(client.name);
        clientsIdList.push({ id: client.id, name: client.name });
      });

      await transaction.commit();
      return res.status(200).json({ clientsList, clientsIdList });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async findClientInformation(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { name, cpfNumber } = req.body;
      const today = new Date();

      const client = await Client.findOne({
        attributes: ['name', 'cpf_number', 'phone01'],
        order: ['name'],
        include: [
          {
            model: Reservation,
            as: 'reservations',
            attributes: ['pay_style'],
            required: false,
            where: {
              date: {
                [Op.between]: [new Date(`${today.getFullYear()}-01-01`), new Date(`${today.getFullYear() + 1}-01-01`)],
              },
            },
          },
        ],
        where: { name, cpfNumber },
      });

      await transaction.commit();
      return res.status(200).json(client);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async findByName(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { name, cpfNumber } = req.body;

      const client = await Client.findOne({
        where: { name, cpfNumber },
        attributes: ['admissionDate', 'annualCredit', 'id', 'monthlyCredit', 'name'],
        include: [
          {
            model: Dependent,
            as: 'dependents',
            attributes: {
              exclude: ['clientId'],
            },
          },
        ],
      });

      await transaction.commit();
      return res.status(200).json(client);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async findClientsBanks(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const banks = await Client.findAll({
        attributes: ['bank_code'],
        order: ['bank_code'],
        group: 'bank_code',
      });

      await transaction.commit();
      return res.status(200).json(banks);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async findClientsAssociationHistory(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { start, end, clientId } = req.body;

      const where = {};

      if (start && end) {
        where.createdAt = { [Op.between]: [start, end] };
      } else if (start) {
        where.createdAt = { [Op.gte]: start };
      } else if (end) {
        where.createdAt = { [Op.lte]: end };
      }

      if (clientId) {
        where.clientId = clientId;
      }

      const history = await AssociationHistory.findAll({
        include: {
          model: Client,
          as: 'clients',
          attributes: ['name'],
        },
        where,
        order: [
          ['clients', 'name', 'ASC'],
          ['order', 'DESC'],
        ],
      });

      await transaction.commit();
      return res.status(200).json(history);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async simpleSearch(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { value } = req.body;

      const clients = await Client.findAll({ where: { name: { [Op.like]: `%${value}%` } }, order: ['name'] });

      await transaction.commit();
      return res.status(200).json(clients);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async searchRefunds(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { clientId, start, end } = req.body;

      const refunds = await Refund.findAll({
        where: { [Op.and]: [{ clientId }, { invoiceReceived: { [Op.between]: [new Date(start), new Date(end)] } }] },
      });

      await transaction.commit();
      return res.status(200).json({ refunds });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async store(request, response) {
    const transaction = await sequelize.transaction();

    try {
      const { userId, client } = request.body;

      const data = await Client.create(client, {
        include: [
          {
            model: Address,
            as: 'adresses',
          },
          {
            model: Dependent,
            as: 'dependents',
          },
          {
            model: ClientHistory,
            as: 'clientHistory',
          },
        ],
      });

      await AssociationHistory.create({
        clientId: data.id,
        order: 0,
        associate: data.associate,
        associateState: data.associateState,
      });

      const action = {
        userId,
        action: 'Criou um Cliente',
        reference: data.name,
      };

      await Action.create(action);

      await transaction.commit();
      return response.status(201).json(data);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return response.status(500).json({ message: 'Server error', error });
    }
  },

  async storeRefund(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { refund, userId, monthly, annual } = req.body;

      const order = await Refund.max('order');

      refund.order = order !== null ? parseFloat(order) + 1 : 0;

      await Refund.create(refund);

      await Client.update(
        { monthlyCredit: monthly, annualCredit: annual },
        {
          where: {
            id: refund.clientId,
          },
        },
      );

      const action = {
        userId,
        action: 'Criou um reembolso',
        reference: refund.clientName,
      };

      await Action.create(action);

      await transaction.commit();
      return res.status(201).json({ message: 'Success' });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async update(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { client, clientId, userId } = req.body;
      const { adresses, dependents, clientHistory, ...newClient } = client;

      const exist = await Client.findOne({ where: { id: clientId } });

      if (!exist) {
        await transaction.rollback();
        return res.status(404).json({ message: 'Cliente não encontrado:' });
      }

      if (exist.associate !== newClient.associate) {
        const order = await AssociationHistory.max('order', { where: { clientId: exist.id } });

        await AssociationHistory.create({
          clientId: exist.id,
          order: order + 1,
          associate: newClient.associate,
          associateState: newClient.associateState,
        });
      }

      const findAddresses = await Address.findAll({ where: { client_Id: clientId } });

      findAddresses.forEach(async (element) => {
        const { dataValues } = element;
        const { id } = dataValues;
        let canPass = false;

        adresses.forEach((address) => {
          if (address.id === id) {
            canPass = true;
          }
        });

        if (!canPass) {
          await Address.destroy({ where: { id } });
        }
      });

      adresses.forEach(async (address) => {
        if (!address.id) {
          await Address.create(address);
        } else {
          const find = await Address.findOne({ where: { id: address.id } });

          if (find) {
            await Address.update(address, { where: { id: address.id } });
          }
        }
      });

      const findDependents = await Dependent.findAll({ where: { client_Id: clientId } });

      findDependents.forEach(async (element) => {
        const { dataValues } = element;
        const { id } = dataValues;
        let canPass = false;

        dependents.forEach((dependent) => {
          if (dependent.id === id) {
            canPass = true;
          }
        });

        if (!canPass) {
          await Dependent.destroy({ where: { id } });
        }
      });

      dependents.forEach(async (dependent) => {
        if (!dependent.id) {
          await Dependent.create(dependent);
        } else {
          const find = await Dependent.findOne({ where: { id: dependent.id } });

          if (find) {
            await Dependent.update(dependent, { where: { id: dependent.id } });
          }
        }
      });

      const findClientHistory = await ClientHistory.findAll({ where: { client_id: clientId } });

      findClientHistory.forEach(async (element) => {
        const {
          dataValues: { id },
        } = element;
        let canPass = false;

        clientHistory.forEach((history) => {
          if (history.id === id) {
            canPass = true;
          }
        });

        if (!canPass) {
          await ClientHistory.destroy({ where: { id } });
        }
      });

      clientHistory.forEach(async (history) => {
        if (!history.id) {
          await ClientHistory.create(history);
        } else {
          const find = await ClientHistory.findOne({ where: { id: history.id } });

          if (find) {
            await ClientHistory.update(history, { where: { id: find.id } });
          }
        }
      });

      const affectedRows = await Client.update(newClient, { where: { id: clientId } });

      const action = {
        userId,
        action: 'Atualizou um Cliente',
        reference: client.name,
      };

      await Action.create(action);

      await transaction.commit();
      return res.status(200).json({ data: `Cliente encontrado: ${affectedRows}` });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error: ', error });
    }
  },

  async remoteUpdate(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { addresses, client } = req.body;

      const findClient = await Client.findOne({
        where: { name: client.name, cpfNumber: client.cpfNumber },
      });

      let message = '';

      if (findClient) {
        message = 'Update';

        if (findClient.associate !== client.associate) {
          const order = await AssociationHistory.max('order', { where: { clientId: findClient.id } });

          await AssociationHistory.create({
            clientId: findClient.id,
            order: order + 1,
            associate: client.associate,
            associateState: client.associateState,
          });
        }

        await Client.update(client, {
          where: { name: client.name, cpfNumber: client.cpfNumber },
        });
      } else {
        const newClient = {
          adresses: addresses,
          ...client,
          annualCredit: 700,
          monthlyCredit: 175,
        };

        message = 'Create';

        const resClient = await Client.create(newClient, {
          include: [
            {
              model: Address,
              as: 'adresses',
            },
          ],
        });

        await AssociationHistory.create({
          clientId: resClient.dataValues.id,
          order: 0,
          associate: resClient.dataValues.associate,
          associateState: resClient.dataValues.associateState,
        });
      }

      await transaction.commit();
      return res.status(200).json({ message });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error: ', error });
    }
  },

  async remoteInsert(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { client } = req.body;

      const findClient = await Client.findOne({
        where: { name: client.name, cpfNumber: client.cpfNumber },
      });

      if (!findClient) {
        await transaction.rollback();
        return res.status(200).json({ status: false });
      }

      if (findClient.associate !== client.associate) {
        const order = await AssociationHistory.max('order', { where: { clientId: findClient.id } });

        await AssociationHistory.create({
          clientId: findClient.id,
          order: order + 1,
          associate: findClient.associate,
          associateState: client.associateState,
        });
      }

      await Client.update(client, {
        where: { name: client.name, cpfNumber: client.cpfNumber },
      });

      await transaction.commit();
      return res.status(200).json({ status: true });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error: ', error });
    }
  },

  async remoteUpdateDependent(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { dependent } = req.body;

      const findClient = await Client.findOne({
        where: { name: dependent.clientName, cpfNumber: dependent.clientCpf },
      });

      if (!findClient) {
        await transaction.rollback();
        return res.status(200).json({ status: false });
      }

      const order = await Dependent.max('order', { where: { clientId: findClient.id } });

      dependent.order = order !== null ? order + 1 : 0;

      await Dependent.create({ clientId: findClient.dataValues.id, order, ...dependent });

      await transaction.commit();
      return res.status(200).json({ status: true });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error: ', error });
    }
  },

  async removeClientById(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { id } = req.body;

      await Client.destroy({ where: { id } });

      await transaction.commit();
      return res.status(200).json({ status: true });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error: ', error });
    }
  },
};

module.exports = clientController;
