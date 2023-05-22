const router = require('express').Router();

// Get Session user_id
router.get('/', async (req, res) => {
    console.log(req);
    // Check if the user is logged in
    if (req.session.user_id) {
      try {
        // Assuming the session user data contains the user_id property
        const user_id = req.session.user_id;
        res.json({ user_id });
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving user ID from session' });
      }
    } else {
      res.status(401).json({ message: req });
    }
  });
 module.exports = router; 