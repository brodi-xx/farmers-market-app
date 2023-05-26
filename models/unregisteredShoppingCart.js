const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
// const UserProduct = require('./userProduct');
// const UnregisteredCartProduct = require('./unregisteredCartProduct');

class UnregisteredShoppingCart extends Model {}

UnregisteredShoppingCart.init(
  {
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    session_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Unique to the session ID
    },
    date_added: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'unregistered_shopping_cart'
  }
)

// Delete the UnregisteredShoppingCart after 3 days using a class method
UnregisteredShoppingCart.deleteAfterThreeDays = async function () {
  const threeDaysAgo = new Date()
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
  await UnregisteredShoppingCart.destroy({
    where: {
      date_added: {
        [sequelize.Op.lt]: threeDaysAgo
      }
    }
  })
}

module.exports = UnregisteredShoppingCart
