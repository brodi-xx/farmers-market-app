const router = require('express').Router();
const { UserShoppingCart, PurchaseHistory } = require('../../models');

// Endpoint /user-purchase-history

// Get all purchase history records - FAILED
router.get('/', async (req, res) => {
  try {
    const purchaseHistory = await PurchaseHistory.findAll({
      include: [{ model: UserShoppingCart }],
    });
    res.status(200).json(purchaseHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get all purchase history records for a cart
router.get('/:cart_id', async (req, res) => {
  const cartId = req.params.cart_id;
  try {
    const purchaseHistory = await PurchaseHistory.findAll({
      where: { cart_id: cartId },
      include: [{ model: UserShoppingCart }],
    });

    if (purchaseHistory.length === 0) {
      return res.status(404).json({ message: 'The purchase record you requested could not be found.' });
    };
    res.status(200).json(purchaseHistory);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create new purchase history record from cart data
router.post('/', async (req, res) => {
  const cartId = req.body.cart_id;
  try {
    const cart = await UserShoppingCart.findByPk(cartId);
    
    if (!cart) {
      res.status(404).json({ message: 'There was no cart found with that ID.' });
    }
    const purchaseHistory = await PurchaseHistory.create({
      cart_id: cart.id,
    });

    res.status(200).json(purchaseHistory);
  
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a purchase history record by ID
router.delete('/:id', async (req, res) => {
  try {
    const purchaseHistory = await PurchaseHistory.destroy({
      where: { id: req.params.id },
    });

    if (!purchaseHistory) {
      return res.status(404).json({ message: 'The purchase record you requested could not be found.' });
    }
    res.status(200).json({ message: 'The purchase record was deleted.' });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
