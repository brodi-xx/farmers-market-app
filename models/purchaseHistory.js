const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');
const Product = require('./userProduct');

class PurchaseHistory extends Model {}

PurchaseHistory.init(
  {
    purchase_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'product_id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
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

User.hasMany(PurchaseHistory, {
  foreignKey: 'user_id',
});

PurchaseHistory.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = PurchaseHistory;
