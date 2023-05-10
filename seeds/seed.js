const sequelize = require('../config/connection');
const { User, UserPaymentMethod, UserProduct } = require('../models');

const userData = require('./userData.json');
const userPaymentMethodData = require('./userPaymentMethodData.json');
const userProductData = require('./userProductData.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const createdUsers = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   const paymentMethods = userPaymentData.map(payment => ({
//     ...payment,
//     user_id: createdUsers.find(user => user.name === payment.user_id).id,
//   }));

//   await UserPaymentMethod.bulkCreate(paymentMethods);

//   // Fetch the UserPaymentMethod data from the database
//   const createdPaymentMethods = await UserPaymentMethod.findAll();

//   const products = userProductData.map(product => ({
//     ...product,
//     user_id: createdUsers.find(user => user.name === product.user_id).id,
//     payment_method_id: createdPaymentMethods.find(
//       paymentMethod => paymentMethod.name === product.payment_method_id
//     ).id,
//   }));

//   await UserProduct.bulkCreate(products);

//   process.exit(0);
// };


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // Seed users
  const usersPromises = userData.map((user) => User.create(user));
  const users = await Promise.all(usersPromises);
  console.log('\n----- USERS SEEDED -----\n');

  // Seed user payment methods
  const userPaymentMethodsPromises = userPaymentMethodData.map((payment, index) => {
    const foundUser = users[index];
    return UserPaymentMethod.create({
      ...payment,
      user_id: foundUser.user_id, // Assign the id property of the found user
    });
  });
  await Promise.all(userPaymentMethodsPromises);
  console.log('\n----- USER PAYMENT METHODS SEEDED -----\n');

  // Seed user products
  const userProductsPromises = userProductData.map((product, index) => {
    const foundUser = users[index % users.length];
    return UserProduct.create({
      ...product,
      user_id: foundUser.user_id, // Assign the id property of the found user
      seller_name: foundUser.name,
    });
  });
  await Promise.all(userProductsPromises);
  console.log('\n----- USER PRODUCTS SEEDED -----\n');

  process.exit(0);
};



seedDatabase();
