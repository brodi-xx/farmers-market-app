const router = require('express').Router();
const { PurchaseHistory, User, Product } = require('../../models');

// GET /purchase-history - Get all purchase history records
router.get('/', async (req, res) => {
  try {
    const purchaseHistory = await PurchaseHistory.findAll({
      include: [{ model: User }, { model: Product }],
    });
    res.status(200).json(purchaseHistory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /purchase-history/:id - Get purchase history record by ID
router.get('/:id', async (req, res) => {
  try {
    const purchaseHistory = await PurchaseHistory.findByPk(req.params.id, {
      include: [{ model: User }, { model: Product }],
    });
    if (!purchaseHistory) {
      res.status(404).json({ message: 'Purchase history record not found' });
    } else {
      res.status(200).json(purchaseHistory);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /purchase-history - Create a new purchase history record
router.post('/', async (req, res) => {
  try {
    const newPurchaseHistory = await PurchaseHistory.create(req.body);
    res.status(201).json(newPurchaseHistory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT /purchase-history/:id - Update a purchase history record by ID
router.put('/:id', async (req, res) => {
  try {
    const [numAffectedRows, affectedRows] = await PurchaseHistory.update(req.body, {
      where: { purchase_id: req.params.id },
      returning: true,
    });
    if (numAffectedRows === 0) {
      res.status(404).json({ message: 'Purchase history record not found' });
    } else {
      res.status(200).json(affectedRows[0]);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /purchase-history/:id - Delete a purchase history record by ID
router.delete('/:id', async (req, res) => {
  try {
    const numAffectedRows = await PurchaseHistory.destroy({
      where: { purchase_id: req.params.id },
    });
    if (numAffectedRows === 0) {
      res.status(404).json({ message: 'Purchase history record not found' });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
