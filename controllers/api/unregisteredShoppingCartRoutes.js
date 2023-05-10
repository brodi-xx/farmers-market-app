const router = require('express').Router();
const { UnregisteredShoppingCart } = require('../../models');

// Get all items in unregistered shopping cart
router.get('/', async (req, res) => {
  try {
    const cartData = await UnregisteredShoppingCart.findAll();
    res.status(200).json(cartData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add item to unregistered shopping cart
router.post('/', async (req, res) => {
  try {
    const cartData = await UnregisteredShoppingCart.create(req.body);
    res.status(200).json(cartData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update item in unregistered shopping cart
router.put('/:id', async (req, res) => {
  try {
    const cartData = await UnregisteredShoppingCart.update(req.body, {
      where: {
        cart_id: req.params.id,
      },
    });
    res.status(200).json(cartData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete item from unregistered shopping cart
router.delete('/:id', async (req, res) => {
  try {
    const cartData = await UnregisteredShoppingCart.destroy({
      where: {
        cart_id: req.params.id,
      },
    });
    res.status(200).json(cartData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
