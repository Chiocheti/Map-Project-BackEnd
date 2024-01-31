const { Op } = require('sequelize');

const {
  Client,
  Address,
  Bank,
  Bill,
  BillingPriority,
  Contract,
  Dependent,
  Specialty,
  Refund,
  sequelize,
} = require('../models');

const reportController = {
  async report(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { fields, query, addresses, dependents, refunds } = req.body;

      if (query.associate) {
        query.associate = { [Op.or]: query.associate };
      }

      if (query.birthdate) {
        if (query.birthdate.start && query.birthdate.end) {
          query.birthdate = { [Op.between]: [query.birthdate.start, query.birthdate.end] };
        } else if (query.birthdate.start) {
          query.birthdate = { [Op.gte]: query.birthdate.start };
        } else {
          query.birthdate = { [Op.lte]: query.birthdate.end };
        }
      }

      if (query.admissionDate) {
        if (query.admissionDate.start && query.admissionDate.end) {
          query.admissionDate = { [Op.between]: [query.admissionDate.start, query.admissionDate.end] };
        } else if (query.admissionDate.start) {
          query.admissionDate = { [Op.gte]: query.admissionDate.start };
        } else {
          query.admissionDate = { [Op.lte]: query.admissionDate.end };
        }
      }

      if (query.baseSalary) {
        if (query.baseSalary.start && query.baseSalary.end) {
          query.baseSalary = { [Op.between]: [query.baseSalary.start, query.baseSalary.end] };
        } else if (query.baseSalary.start) {
          query.baseSalary = { [Op.gte]: query.baseSalary.start };
        } else {
          query.baseSalary = { [Op.lte]: query.baseSalary.end };
        }
      }

      if (query.discount) {
        if (query.discount.start && query.discount.end) {
          query.discount = { [Op.between]: [query.discount.start, query.discount.end] };
        } else if (query.discount.start) {
          query.discount = { [Op.gte]: query.discount.start };
        } else {
          query.discount = { [Op.lte]: query.discount.end };
        }
      }

      if (query.hiringDate) {
        if (query.hiringDate.start && query.hiringDate.end) {
          query.hiringDate = { [Op.between]: [query.hiringDate.start, query.hiringDate.end] };
        } else if (query.hiringDate.start) {
          query.hiringDate = { [Op.gte]: query.hiringDate.start };
        } else {
          query.hiringDate = { [Op.lte]: query.hiringDate.end };
        }
      }

      if (query.dismissalDate) {
        if (query.dismissalDate.start && query.dismissalDate.end) {
          query.dismissalDate = { [Op.between]: [query.dismissalDate.start, query.dismissalDate.end] };
        } else if (query.dismissalDate.start) {
          query.dismissalDate = { [Op.gte]: query.dismissalDate.start };
        } else {
          query.dismissalDate = { [Op.lte]: query.dismissalDate.end };
        }
      }

      if (query.retirementDate) {
        if (query.retirementDate.start && query.retirementDate.end) {
          query.retirementDate = { [Op.between]: [query.retirementDate.start, query.retirementDate.end] };
        } else if (query.retirementDate.start) {
          query.retirementDate = { [Op.gte]: query.retirementDate.start };
        } else {
          query.retirementDate = { [Op.lte]: query.retirementDate.end };
        }
      }

      if (dependents?.query?.birthdate) {
        if (dependents.query.birthdate.start && dependents.query.birthdate.end) {
          dependents.query.birthdate = {
            [Op.between]: [dependents.query.birthdate.start, dependents.query.birthdate.end],
          };
        } else if (dependents.query.birthdate.start) {
          dependents.query.birthdate = { [Op.gte]: dependents.query.birthdate.start };
        } else {
          dependents.query.birthdate = { [Op.lte]: dependents.query.birthdate.end };
        }
      }

      if (refunds?.query?.invoiceReceived) {
        if (refunds.query.invoiceReceived.start && refunds.query.invoiceReceived.end) {
          refunds.query.invoiceReceived = {
            [Op.between]: [refunds.query.invoiceReceived.start, refunds.query.invoiceReceived.end],
          };
        } else if (refunds.query.invoiceReceived.start) {
          refunds.query.invoiceReceived = { [Op.gte]: refunds.query.invoiceReceived.start };
        } else {
          refunds.query.invoiceReceived = { [Op.lte]: refunds.query.invoiceReceived.end };
        }
      }

      if (refunds?.query?.invoiceValue) {
        if (refunds.query.invoiceValue.start && refunds.query.invoiceValue.end) {
          refunds.query.invoiceValue = {
            [Op.between]: [refunds.query.invoiceValue.start, refunds.query.invoiceValue.end],
          };
        } else if (refunds.query.invoiceValue.start) {
          refunds.query.invoiceValue = { [Op.gte]: refunds.query.invoiceValue.start };
        } else {
          refunds.query.invoiceValue = { [Op.lte]: refunds.query.invoiceValue.end };
        }
      }

      if (refunds?.query?.refundValue) {
        if (refunds.query.refundValue.start && refunds.query.refundValue.end) {
          refunds.query.refundValue = {
            [Op.between]: [refunds.query.refundValue.start, refunds.query.refundValue.end],
          };
        } else if (refunds.query.refundValue.start) {
          refunds.query.refundValue = { [Op.gte]: refunds.query.refundValue.start };
        } else {
          refunds.query.refundValue = { [Op.lte]: refunds.query.refundValue.end };
        }
      }

      const tables = [];

      if (addresses?.fields?.length > 0) {
        tables.push({
          model: Address,
          as: 'adresses',
          attributes: addresses.fields,
          where: addresses.query,
        });
      }

      if (dependents?.fields?.length > 0) {
        tables.push({
          model: Dependent,
          as: 'dependents',
          attributes: dependents.fields,
          where: dependents.query,
        });
      }

      if (refunds?.fields?.length > 0) {
        const { dependentId, ...query } = refunds.query;

        const obj = {
          model: Refund,
          as: 'refunds',
          attributes: refunds.fields,
          where: query || {},

          include: [],
        };

        refunds?.fields.forEach((element) => {
          if (element === 'specialtyId') {
            obj.include.push({
              model: Specialty,
              as: 'specialties',
              attributes: ['skill'],
            });
          }

          if (element === 'dependentId') {
            if (dependentId) {
              obj.include.push({
                model: Dependent,
                as: 'dependents',
                attributes: ['name'],
                where: { name: dependentId },
              });
            } else {
              obj.include.push({
                model: Dependent,
                as: 'dependents',
                attributes: ['name'],
              });
            }
          }
        });

        tables.push(obj);
      }

      const order = fields.find((element) => element === 'name');

      const clients = await Client.findAll({
        attributes: fields,
        where: query,
        include: tables,
        order: order === 'name' ? ['name'] : null,
      });

      await transaction.commit();
      return res.status(200).json(clients);
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async refundReport(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { start, end } = req.body;

      let where = '';

      if (start && end) {
        where = { invoiceReceived: { [Op.between]: [start, end] } };
      } else if (start) {
        where = { invoiceReceived: { [Op.gte]: start } };
      } else if (end) {
        where = { invoiceReceived: { [Op.lte]: end } };
      } else {
        where = {};
      }

      const refunds = await Refund.findAll({
        include: [
          {
            model: Dependent,
            as: 'dependents',
            attributes: ['name'],
          },
          {
            model: Specialty,
            as: 'specialties',
            attributes: ['skill'],
          },
          {
            model: Client,
            as: 'clients',
            attributes: ['name', 'admissionDate', 'cpfNumber'],
          },
        ],
        where,
        order: [['clients', 'name']],
      });

      const specialties = await Specialty.findAll({
        attributes: ['skill', 'id'],
        order: ['skill'],
      });

      await transaction.commit();
      return res.status(200).json({ refunds, specialties });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async contractReport(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { start, end } = req.body;

      let where = '';

      if (start && end) {
        where = { invoiceReceived: { [Op.between]: [start, end] } };
      } else if (start) {
        where = { invoiceReceived: { [Op.gte]: start } };
      } else if (end) {
        where = { invoiceReceived: { [Op.lte]: end } };
      } else {
        where = {};
      }

      const contracts = await Contract.findAll({
        include: [
          {
            model: Client,
            as: 'clients',
            attributes: ['name', 'admissionDate'],
          },
          {
            model: BillingPriority,
            as: 'billingPriorities',
            attributes: ['id', 'name', 'value'],
          },
        ],
        where,
        order: [['clients', 'name']],
      });

      const billingPriorities = await BillingPriority.findAll({
        order: ['value'],
      });

      await transaction.commit();
      return res.status(200).json({ contracts, billingPriorities });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async textReport(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { start, end, bank } = req.body;

      let where = '';

      if (start && end) {
        where = { invoiceReceived: { [Op.between]: [start, end] } };
      } else if (start) {
        where = { invoiceReceived: { [Op.gte]: start } };
      } else if (end) {
        where = { invoiceReceived: { [Op.lte]: end } };
      } else {
        where = {};
      }

      const clients = await Client.findAll({
        include: [
          {
            model: Contract,
            as: 'contracts',
            required: true,
            where,
          },
        ],
        where: { bankCode: bank },
        order: [['contracts', 'code']],
      });

      await transaction.commit();
      return res.status(200).json({ clients });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },

  async billsReport(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { start, end, bankId } = req.body;

      console.log(start);
      console.log(end);

      const compBills = await Bill.findAll({
        where: {
          date: { [Op.between]: [start, end] },
          status: 'Compensado',
          bank_id: bankId,
        },
        include: [
          {
            model: Bank,
            as: 'banks',
            attributes: ['bank'],
          },
        ],
        order: [['date', 'DESC']],
      });

      compBills.forEach((bill) => {
        bill.dataValues.account = bill.dataValues.banks.dataValues.bank; // eslint-disable-line
      });

      const pendBills = await Bill.findAll({
        where: {
          date: { [Op.between]: [start, end] },
          status: 'Pendente',
          bank_id: bankId,
        },
        include: [
          {
            model: Bank,
            as: 'banks',
            attributes: ['bank'],
          },
        ],
        order: [['date', 'DESC']],
      });

      pendBills.forEach((bill) => {
        bill.dataValues.account = bill.dataValues.banks.dataValues.bank; // eslint-disable-line
      });

      await transaction.commit();
      return res.status(200).json({ compBills, pendBills });
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
  },
};

module.exports = reportController;
