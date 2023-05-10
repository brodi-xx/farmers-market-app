const router = require('express').Router();
const { UserPaymentMethod } = require('../../models');

// Get all user payment methods
router.get('/', async (req, res) => {
  try {
    const paymentMethods = await UserPaymentMethod.findAll();
    res.status(200).json(paymentMethods);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single user payment method
router.get('/:id', async (req, res) => {
  try {
    const paymentMethod = await UserPaymentMethod.findByPk(req.params.id);
    if (!paymentMethod) {
      res.status(404).json({ message: 'Payment method not found' });
    } else {
      res.status(200).json(paymentMethod);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a user payment method
router.post('/', async (req, res) => {
  try {
    const paymentMethod = await UserPaymentMethod.create(req.body);
    res.status(201).json(paymentMethod);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a user payment method
router.put('/:id', async (req, res) => {
  try {
    const paymentMethod = await UserPaymentMethod.findByPk(req.params.id);
    if (!paymentMethod) {
      res.status(404).json({ message: 'Payment method not found' });
    } else {
      const updatedPaymentMethod = await paymentMethod.update(req.body);
      res.status(200).json(updatedPaymentMethod);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a user payment method
router.delete('/:id', async (req, res) => {
  try {
    const paymentMethod = await UserPaymentMethod.findByPk(req.params.id);
    if (!paymentMethod) {
      res.status(404).json({ message: 'Payment method not found' });
    } else {
      await paymentMethod.destroy();
      res.status(204).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
