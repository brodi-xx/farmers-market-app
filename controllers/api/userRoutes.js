const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');
// const { UserProduct } = require('../../models');
// const { UnregisteredCartProduct } = require('../../models');
// const { UnregisteredShoppingCart } = require('../../models');
// const { UserShoppingCart } = require('../../models');

// Endpoint - /user 

// GET /user - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /user/:id - Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /user - Create a new user
router.post('/', async (req, res) => {
  try {
    const password = req.body.password;
    const newUser = await User.create({ ...req.body, password: password });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT /user/:id - Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check if password is included in the update request
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 8);
      req.body.password = hashedPassword;
    }

    const updatedUser = await user.update(req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /user/:id - Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const numAffectedRows = await User.destroy({ where: { user_id: req.params.id } });
    if (numAffectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Endpoint - /user/login

// POST /user/login - User login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username, please try again' });
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, userData.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password, please try again' });
      return;
    }

    // // Transfer items from UnregisteredShoppingCart to UserShoppingCart
    // const unregisteredCart = await UnregisteredShoppingCart.findOne({ where: { session_id: req.session.id } });
    // console.log("Unregistered Cart", unregisteredCart);
    // if (unregisteredCart) {
    //   // Fetch products in the unregistered cart
    //   const products = await UnregisteredCartProduct.findAll({
    //     where: { cart_id: unregisteredCart.cart_id },
    //     include: [{ model: UserProduct }],
    //   });
    //   console.log("products", products);

    //   // Get or create UserShoppingCart for the user
    //   let userCart = await UserShoppingCart.findOne({ where: { user_id: userData.user_id } });
    //   if (!userCart) {
    //     userCart = await UserShoppingCart.create({ user_id: userData.user_id });
    //   }
    //   console.log("usercart", userCart);

    //   // Add products to the user's cart
    //   for (let product of products) {
    //     const userProduct = await UserProduct.findOne({ where: { product_id: product.UserProduct.product_id } });
    //     if (userProduct) {
    //       await userCart.addUserProduct(userProduct, { through: { quantity: product.quantity } });
    //     }
    //     console.log("userproduct", userProduct);
    //   }

    //   // Delete the unregistered cart
    //   await UnregisteredCartProduct.destroy({ where: { cart_id: unregisteredCart.cart_id } });
    //   await unregisteredCart.destroy();
    // }

    req.session.save(async () => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;
      await User.update({ loginstatus: true }, { where: { user_id: req.session.user_id } }); // Set loginstatus to true in the database
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST /user/logout - User logout
router.post('/logout', async (req, res) => {
  if (req.session.logged_in) {
    const userId = req.session.user_id;
    await User.update({ loginstatus: false }, { where: { user_id: userId } }); // Set loginstatus to false in the database
    try {
      req.session.destroy(() => {
        res.status(200).json({ message: 'You are now logged out!' });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json({ message: 'User not logged in' });
  }
});




module.exports = router;
