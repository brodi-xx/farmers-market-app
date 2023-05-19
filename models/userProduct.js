const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const UnregisteredCartProduct = require('./unregisteredCartProduct');
const UnregisteredShoppingCart = require('./unregisteredShoppingCart');


class UserProduct extends Model { }

UserProduct.init(
  {
    product_id: {
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
    seller_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sold_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount_available: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_product',
  }
);

User.hasMany(UserProduct, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

UserProduct.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'user_id',
  as: 'seller',
});

UserProduct.hasMany(UnregisteredCartProduct, {
  foreignKey: 'product_id',
  sourceKey: 'product_id',
});

UserProduct.belongsToMany(UnregisteredShoppingCart, {
  through: 'unregistered_cart_product',
  foreignKey: 'product_id',
  otherKey: 'cart_id',
});

UserProduct.addHook('beforeSave', async (userProduct) => {
  const user = await User.findOne({
    where: { user_id: userProduct.user_id },
    attributes: ['name'],
  });

  if (user) {
    userProduct.seller_name = user.name;
  }
});

module.exports = UserProduct;