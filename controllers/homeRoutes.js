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

router.get('/', startSessionForUnregisteredUser, async (req, res) => {
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

// Protect the routes that require authentication with the withAuth middleware

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/homepage', (req, res) => {
  res.render('homepage');
});

router.get('/eventsList', (req, res) => {
  res.render('eventsList');
});

router.get('/mycart', (req, res) => {
  res.render('mycart');
});

router.get('/productspage', (req, res) => {
  res.render('productspage');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/profile', withAuth, (req, res) => {
  res.render('profile');
});

module.exports = router;
