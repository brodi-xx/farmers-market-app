const router = require('express').Router();
const userRoutes = require('./userRoutes');
const userPaymentMethod = require('./userPaymentMethodRoutes');
const userProduct = require('./userProductRoutes');
const userShoppingCart = require('./userShoppingCartRoutes');
const cartProduct = require('./cartProductRoutes');
const unregisteredShoppingCartRoutes = require('./unregisteredShoppingCartRoutes');
const unregisteredCartProduct = require('./unregisteredCartProductRoutes')
const purchaseHistoryRoutes = require('./purchaseHistoryRoutes');
const userEventRoutes = require('./userEventRoutes')

router.use('/user', userRoutes);
router.use('/user-payment', userPaymentMethod);
router.use('/user-product', userProduct);
router.use('/user-shopping-cart', userShoppingCart);
router.use('/cart-product', cartProduct);
router.use('/unregistered-shopping-cart', unregisteredShoppingCartRoutes);
router.use('/unregistered-cart-product', unregisteredCartProduct);
router.use('/user-purchase-history', purchaseHistoryRoutes);
router.use('/userEventRoutes', userEventRoutes);
router.use('/events', userEventRoutes);

module.exports = router;
