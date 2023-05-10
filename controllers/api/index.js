const router = require('express').Router();
const userRoutes = require('./userRoutes');
const userShoppingCart = require('./userShoppingCartRoutes');
const userPaymentMethod = require('./userPaymentMethodRoutes');
const userProduct = require('./userProductRoutes');
const purchaseHistoryRoutes = require('./purchaseHistoryRoutes');
const unregisteredShoppingCartRoutes = require('./unregisteredShoppingCartRoutes');

router.use('/user', userRoutes);
router.use('/user-shopping-cart', userShoppingCart);
router.use('/user-payment', userPaymentMethod);
router.use('/user-product', userProduct);
router.use('/user-purchase-history', purchaseHistoryRoutes);
router.use('/unregistered-shopping-cart', unregisteredShoppingCartRoutes);

module.exports = router;
