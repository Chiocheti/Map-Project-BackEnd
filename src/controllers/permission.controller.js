const { Permission } = require('../models');

const permissionController = {
  async index(request, response) {
    try {
      const permissions = await Permission.findAll();

      return response.status(200).json(permissions);
    } catch (error) {
      return response.status(500).json({ message: 'Server error', error });
    }
  },

  async store(request, response) {
    try {
      const permission = request.body;

      const data = await Permission.create(permission);

      return response.status(201).json({ data });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Server error', error });
    }
  },
};

module.exports = permissionController;
