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

// Get purchase history record by ID - FAILED
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

// Create a new purchase history record - FAILED (does not allow multiple products to be added)
router.post('/', async (req, res) => {
  try {
    const newPurchaseHistory = await PurchaseHistory.create(req.body);
    res.status(201).json(newPurchaseHistory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a purchase history record by ID - We shouldn't need to update a purchase history record
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

// Delete a purchase history record by ID - PASSED TENTATIVELY (received 200 status but data not confirmed until GET route passes)
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
