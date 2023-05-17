const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// Middleware to start a session for unregistered users
const startSessionForUnregisteredUser = (req, res, next) => {
  if (!req.session.logged_in) {
    // Set a flag indicating that the user is an unregistered user
    req.session.unregistered = true;
    // You can also set other session data specific to unregistered users if needed
  }
  next();
};

router.get('/', startSessionForUnregisteredUser, withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
      unregistered: req.session.unregistered,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render ('signup')
});

router.get('/mycart', (req, res) => {
  res.render ('signup')
})

module.exports = router;
