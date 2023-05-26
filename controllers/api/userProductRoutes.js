const router = require('express').Router()
const { User, UserProduct } = require('../../models')

// Endpoint - /user-product

// Get all user products
router.get('/', async (req, res) => {
  try {
    const userProducts = await UserProduct.findAll({
      include: [{ model: User, as: 'seller', attributes: ['name'] }]
    })
    res.status(200).json(userProducts)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get a single user product by ID
router.get('/:id', async (req, res) => {
  try {
    const userProduct = await UserProduct.findByPk(req.params.id, {
      include: [{ model: User, as: 'seller', attributes: ['name'] }]
    })

    if (!userProduct) {
      res.status(404).json({ message: 'No user product found with this id!' })
      return
    }

    res.status(200).json(userProduct)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Create a new user product - FAILED (requires seller name which should be referenced by id), (quantity NOT NULL error even with proper value passed)
router.post('/', async (req, res) => {
  try {
    const userProductData = await UserProduct.create(req.body)
    res.status(201).json(userProductData)
  } catch (err) {
    res.status(400).json(err)
  }
})

// Update a user product by ID - FAILED (quantity value does not update)
router.put('/:id', async (req, res) => {
  try {
    const userProduct = await UserProduct.findByPk(req.params.id)

    if (!userProduct) {
      res.status(404).json({ message: 'No user product found with this id!' })
      return
    }

    await userProduct.update(req.body)

    res.status(200).json({ message: 'User product updated successfully!' })
  } catch (err) {
    res.status(500).json(err)
  }
})
// Delete a user product by ID
router.delete('/:id', async (req, res) => {
  try {
    const userProduct = await UserProduct.findByPk(req.params.id)

    if (!userProduct) {
      res.status(404).json({ message: 'No user product found with this id!' })
      return
    }

    await userProduct.destroy()

    res.status(200).json({ message: 'User product deleted successfully!' })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
