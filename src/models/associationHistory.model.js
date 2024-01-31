const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class AssociationHistory extends Model {
    static associate(models) {
      this.belongsTo(models.Client, { as: 'clients', foreignKey: 'clientId' });
    }
  }

  AssociationHistory.init(
    {
      order: DataTypes.INTEGER,
      associate: DataTypes.STRING,
      associateState: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'AssociationHistory',
      tableName: 'association_histories',
      underscored: true,
      timestamps: true,
      hooks: {
        beforeCreate: (association) => {
          association.id = uuidv4(); //eslint-disable-line
        },
      },
    },
  );

  return AssociationHistory;
};
