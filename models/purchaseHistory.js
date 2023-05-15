const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PurchaseHistory extends Model {}

PurchaseHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    purchase_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'purchase_history',
  }
);

module.exports = PurchaseHistory;
