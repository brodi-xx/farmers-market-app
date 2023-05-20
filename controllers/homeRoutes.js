const router = require('express').Router();
const { User, UserProduct, UserEvent} = require('../models');
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

router.get('/mycart', (req, res) => {
  res.render('mycart');
});

router.get('/productspage', async (req, res) => {
  // findAll on the userProducts to retrieve all of the products in the database, and pass that as an array of objects
  const productData = await UserProduct.findAll();
  console.log(productData);

  const products = productData.map(product => product.get({ plain: true}));
  console.log(products);

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
    let user;
    if (req.session.user_id) {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
      });

      user = userData.get({ plain: true });
    }

    res.render('profile', {
      profile_picture: user ? user.profile_picture : '',
      user: user || {}, 
      user_id: user ? user.user_id : '', 
      address: user ? user.address : '', 
      birthday: user ? user.birthday : '', 
      about: user ? user.about : '', 
      email: user ? user.email : '', 
      phone: user ? user.phone : '', 
      logged_in: req.session.logged_in || false,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
