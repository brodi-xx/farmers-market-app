const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');

class UserPaymentMethod extends Model {}

UserPaymentMethod.init(
  {
    payment_method_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    card_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiration_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_payment_method',
  }
);

User.hasMany(UserPaymentMethod, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

UserPaymentMethod.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = UserPaymentMethod;