const router = require('express').Router()
const { UnregisteredCartProduct, UnregisteredShoppingCart, UserProduct } = require('../../models')

// Get all unregistered cart products
router.get('/', async (req, res) => {
  try {
    const unregisteredCartProducts = await UnregisteredCartProduct.findAll({
      include: [
        {
          model: UnregisteredShoppingCart,
          attributes: ['cart_id']
        },
        {
          model: UserProduct,
          attributes: ['product_id', 'product_name', 'description', 'category', 'price']
        }
      ]
    })
    res.status(200).json(unregisteredCartProducts)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get a single unregistered cart product
router.get('/:id', async (req, res) => {
  try {
    const unregisteredCartProduct = await UnregisteredCartProduct.findOne({
      where: { unregistered_cart_product_id: req.params.id },
      include: [
        {
          model: UnregisteredShoppingCart,
          attributes: ['cart_id']
        },
        {
          model: UserProduct,
          attributes: ['product_id', 'product_name', 'description', 'category', 'price']
        }
      ]
    })
    if (!unregisteredCartProduct) {
      res.status(404).json({ message: 'No unregistered cart product found with this id' })
      return
    }
    res.status(200).json(unregisteredCartProduct)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Add a new unregistered cart product
router.post('/', async (req, res) => {
  try {
    const newUnregisteredCartProduct = await UnregisteredCartProduct.create(req.body)
    res.status(201).json(newUnregisteredCartProduct)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Update an unregistered cart product
router.put('/:id', async (req, res) => {
  try {
    const updatedUnregisteredCartProduct = await UnregisteredCartProduct.update(req.body, {
      where: { unregistered_cart_product_id: req.params.id }
    })
    if (!updatedUnregisteredCartProduct[0]) {
      res.status(404).json({ message: 'No unregistered cart product found with this id' })
      return
    }
    res.status(200).json(updatedUnregisteredCartProduct)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Delete an unregistered cart product
router.delete('/:id', async (req, res) => {
  try {
    const deletedUnregisteredCartProduct = await UnregisteredCartProduct.destroy({
      where: { unregistered_cart_product_id: req.params.id }
    })
    if (!deletedUnregisteredCartProduct) {
      res.status(404).json({ message: 'No unregistered cart product found with this id' })
      return
    }
    res.status(200).json(deletedUnregisteredCartProduct)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
