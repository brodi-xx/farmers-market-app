const router = require('express').Router()
const { CartProduct, UserShoppingCart, User, UserProduct } = require('../../models')

// Get all cart products
router.get('/', async (req, res) => {
  try {
    const query = {
      include: [
        {
          model: UserShoppingCart,
          attributes: ['cart_id'],
          include: [
            {
              model: User,
              attributes: ['user_id', 'name', 'email', 'address', 'phone']
            }
          ]
        },
        {
          model: UserProduct,
          attributes: ['product_id', 'product_name', 'description', 'category', 'price']
        }
      ]
    }
    if (req.query.cart_id) {
      query.where = {
        cart_id: req.query.cart_id,
        product_id: req.query.product_id
      }
    }

    const cartProducts = await CartProduct.findAll(query)
    res.status(200).json(cartProducts)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const cartProduct = await CartProduct.findOne({
      where: { cart_product_id: req.params.id },
      include: [
        {
          model: UserShoppingCart,
          attributes: ['cart_id'],
          include: [
            {
              model: User,
              attributes: ['user_id', 'name', 'email', 'address', 'phone']
            },
            {
              model: CartProduct,
              include: {
                model: UserProduct,
                attributes: ['product_id', 'product_name', 'description', 'category', 'price']
              },
              attributes: ['cart_product_id', 'amount']
            }
          ]
        }
      ]
    })
    if (!cartProduct) {
      res.status(404).json({ message: 'No cart product found with this id' })
      return
    }
    res.status(200).json(cartProduct)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Add a new cart product
router.post('/', async (req, res) => {
  try {
    const newCartProduct = await CartProduct.create(req.body)
    res.status(201).json(newCartProduct)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Update a cart product
router.put('/:id', async (req, res) => {
  try {
    const updatedCartProduct = await CartProduct.update(req.body, {
      where: { cart_product_id: req.params.id }
    })
    if (!updatedCartProduct[0]) {
      res.status(404).json({ message: 'No cart product found with this id' })
      return
    }
    res.status(200).json(updatedCartProduct)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Delete a cart product
router.delete('/:id', async (req, res) => {
  try {
    const deletedCartProduct = await CartProduct.destroy({
      where: { cart_product_id: req.params.id }
    })
    if (!deletedCartProduct) {
      res.status(404).json({ message: 'No cart product found with this id' })
      return
    }
    res.status(200).json(deletedCartProduct)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
