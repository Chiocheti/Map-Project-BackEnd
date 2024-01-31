const { Role } = require('../models');

const roleController = {
  async index(request, response) {
    try {
      const roles = await Role.findAll({ order: ['name'] });

      return response.status(200).json(roles);
    } catch (error) {
      return response.status(500).json({ message: 'Server error', error });
    }
  },

  async store(request, response) {
    try {
      const role = request.body;

      const data = await Role.create(role);

      return response.status(201).json({ data });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Server error', error });
    }
  },
};

module.exports = roleController;
