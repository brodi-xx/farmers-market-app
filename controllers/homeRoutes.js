const router = require('express').Router();
const { User, UserProduct, UserEvent} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
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

router.get('/mycart', (req, res) => {
  res.render('mycart');
});

router.get('/productspage', async (req, res) => {
  // findAll on the userProducts to retrieve all of the products in the database, and pass that as an array of objects
  const productData = await UserProduct.findAll();

  const products = productData.map(product => product.get({ plain: true}));

  res.render('productspage', {
    products
  });
});

router.get('/events', async (req, res) => {
  try {
    const events = await UserEvent.findAll({
      include: [{
        model: User,
        attributes: ['name']
      }]
    });
    const eventsData = events.map((event) => event.get({ plain: true }));

    res.render('events', { events: eventsData });  // Assuming 'events' is the name of your Handlebars template
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Retrieve the user data from the session
    const user = req.session.user;

    // Render the profile template and pass the user data
    res.render('profile', { user });
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
