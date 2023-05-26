const router = require('express').Router()
const { UnregisteredShoppingCart, UserProduct } = require('../../models')

// Get all unregistered shopping carts
router.get('/', async (req, res) => {
  try {
    // Retrieve the session ID from the session object
    const sessionId = req.sessionID

    // Use the session ID to query the unregistered shopping carts
    const shoppingCarts = await UnregisteredShoppingCart.findAll({
      where: { session_id: sessionId },
      include: [
        {
          model: UserProduct,
          attributes: ['product_id', 'product_name', 'description', 'category', 'price'],
          through: { attributes: [] } // Exclude the join table attributes
        }
      ]
    })

    res.status(200).json(shoppingCarts)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get a single unregistered shopping cart
router.get('/:id', async (req, res) => {
  try {
    const shoppingCart = await UnregisteredShoppingCart.findOne({
      where: { cart_id: req.params.id },
      include: [
        {
          model: UserProduct,
          attributes: ['product_id', 'product_name', 'description', 'category', 'price'],
          through: { attributes: [] } // Exclude the join table attributes
        }
      ]
    })
    if (!shoppingCart) {
      res.status(404).json({ message: 'No shopping cart found with this id' })
      return
    }
    res.status(200).json(shoppingCart)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Add a new unregistered shopping cart
router.post('/', async (req, res) => {
  try {
    // Retrieve the session ID from the session object
    const sessionId = req.sessionID

    // Create the unregistered shopping cart with the session ID
    const newShoppingCart = await UnregisteredShoppingCart.create({ ...req.body, session_id: sessionId })

    res.status(201).json(newShoppingCart)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Update an unregistered shopping cart
router.put('/:id', async (req, res) => {
  try {
    const updatedShoppingCart = await UnregisteredShoppingCart.update(req.body, {
      where: { cart_id: req.params.id }
    })
    if (!updatedShoppingCart[0]) {
      res.status(404).json({ message: 'No shopping cart found with this id' })
      return
    }
    res.status(200).json(updatedShoppingCart)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Delete an unregistered shopping cart
router.delete('/:id', async (req, res) => {
  try {
    const deletedShoppingCart = await UnregisteredShoppingCart.destroy({
      where: { cart_id: req.params.id }
    })
    if (!deletedShoppingCart) {
      res.status(404).json({ message: 'No shopping cart found with this id' })
      return
    }
    res.status(200).json(deletedShoppingCart)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
