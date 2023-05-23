const router = require('express').Router();
const { UserShoppingCart, User, UserProduct, CartProduct } = require('../../models');


router.get('/', async (req, res) => {
  try {
    let user_id = req.query.user_id;
    const shoppingCarts = await UserShoppingCart.findAll({
      where: { user_id: user_id },
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'address', 'phone'],
        },
        {
          model: CartProduct,
          include: {
            model: UserProduct,
            attributes: ['product_id', 'product_name', 'description', 'category', 'price'],
          },
          attributes: ['amount'],
        },
      ],
    });
    res.status(200).json(shoppingCarts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const shoppingCart = await UserShoppingCart.findOne({
      where: { cart_id: req.params.id },
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'address', 'phone'],
        },
        {
          model: CartProduct,
          include: {
            model: UserProduct,
            attributes: ['product_id', 'product_name', 'description', 'category', 'price'],
          },
          attributes: ['cart_product_id', 'amount'],
        },
      ],
    });
    if (!shoppingCart) {
      res.status(404).json({ message: 'No shopping cart found with this id' });
      return;
    }
    res.status(200).json(shoppingCart);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Add a new user shopping cart
router.post('/', async (req, res) => {
  try {
    const newShoppingCart = await UserShoppingCart.create(req.body);
    res.status(201).json(newShoppingCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a user shopping cart
router.put('/:id', async (req, res) => {
  try {
    const updatedShoppingCart = await UserShoppingCart.update(req.body, {
      where: { cart_id: req.params.id }
    });
    if (!updatedShoppingCart[0]) {
      res.status(404).json({ message: 'No shopping cart found with this id' });
      return;
    }
    res.status(200).json(updatedShoppingCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a user shopping cart
router.delete('/:id', async (req, res) => {
  try {
    const deletedShoppingCart = await UserShoppingCart.destroy({
      where: { cart_id: req.params.id }
    });
    if (!deletedShoppingCart) {
      res.status(404).json({ message: 'No shopping cart found with this id' });
      return;
    }
    res.status(200).json(deletedShoppingCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
