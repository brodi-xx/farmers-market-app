const sequelize = require('../config/connection');
const { User, UserPaymentMethod, UserProduct, UserShoppingCart, CartProduct, UserEvent, PurchaseHistory } = require('../models');
const bcrypt = require('bcrypt');

const userData = require('./userData.json');
const userPaymentMethodData = require('./userPaymentMethodData.json');
const userProductData = require('./userProductData.json');
const cartProductData = require('./cartProductData.json');
const userShoppingCartData = require('./userShoppingCartData.json');
const userEventData = require('./userEventData.json');
const purchaseHistoryData = require('./userPurchaseHistoryData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true, alter: true, drop: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // Seed users
  const usersPromises = userData.map(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return User.create({
      ...user,
      password: hashedPassword,
    });
  });
  const users = await Promise.all(usersPromises);
  console.log('\n----- USERS SEEDED -----\n');

  // // Seed user payment methods
  // const userPaymentMethodsPromises = userPaymentMethodData.map((payment, index) => {
  //   const foundUser = users[index];
  //   return UserPaymentMethod.create({
  //     ...payment,
  //     user_id: foundUser.user_id,
  //   });
  // });
  // await Promise.all(userPaymentMethodsPromises);
  // console.log('\n----- USER PAYMENT METHODS SEEDED -----\n');

  // Seed user products
  const userProductsPromises = userProductData.map((product, index) => {
    const foundUser = users[index % users.length];
    return UserProduct.create({
      ...product,
      user_id: foundUser.user_id,
      seller_name: foundUser.name,
    });
  });
  const userProducts = await Promise.all(userProductsPromises);
  console.log('\n----- USER PRODUCTS SEEDED -----\n');

  // Seed user shopping carts
  const userShoppingCartsPromises = userShoppingCartData.map((cart, index) => {
    const foundUser = users[index % users.length];
    return UserShoppingCart.create({
      ...cart,
      user_id: foundUser.user_id,
    });
  });
  // const userShoppingCarts = await Promise.all(userShoppingCartsPromises);
  // console.log('\n----- USER SHOPPING CARTS SEEDED -----\n');

  // // // Seed cart products
  // // for (let cartProduct of cartProductData) {
  //   // find corresponding product
  //   const product = userProducts.find(prod => prod.product_id === cartProduct.product_id);
  //   if (!product) {
  //     console.log(`Product with id ${cartProduct.product_id} not found`);
  //     continue;
  //   }
  //   // add price to cartProduct
  //   cartProduct.price = product.price;
  // }
  // await CartProduct.bulkCreate(cartProductData);
  // console.log('\n----- CART PRODUCTS SEEDED -----\n');

  // Seed user events
  // const userEventsPromises = userEventData.map((event, index) => {
  //   const foundUser = users[index % users.length];
  //   return UserEvent.create({
  //     ...event,
  //     user_id: foundUser.user_id,
  //   });
  // });
  // await Promise.all(userEventsPromises);
  // console.log('\n----- USER EVENTS SEEDED -----\n');


  // Seed purchase history
  // const purchaseHistoryPromises = purchaseHistoryData.map((history) => PurchaseHistory.create(history));
  // await Promise.all(purchaseHistoryPromises);
  // console.log('\n----- PURCHASE HISTORY SEEDED -----\n');


  // Seed user events
  const userEventsPromises = userEventData.map((event, index) => {
    const foundUser = users[index % users.length];
    return UserEvent.create({
      ...event,
      user_id: foundUser.user_id,
    });
  });
  await Promise.all(userEventsPromises);
  console.log('\n----- USER EVENTS SEEDED -----\n');


  // Seed purchase history
  const purchaseHistoryPromises = purchaseHistoryData.map((history) => PurchaseHistory.create(history));
  await Promise.all(purchaseHistoryPromises);
  console.log('\n----- PURCHASE HISTORY SEEDED -----\n');


  process.exit(0);
};

seedDatabase();
