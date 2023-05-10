const router = require('express').Router();
const { User } = require('../../models');

// GET /users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /users/:id - Get user by ID
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

// POST /users - Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT /users/:id - Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const [numAffectedRows, affectedRows] = await User.update(req.body, {
      where: { user_id: req.params.id },
      returning: true,
    });
    if (numAffectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(affectedRows[0]);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /users/:id - Delete a user by ID
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

// POST /users/login - User login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// POST /users/logout - User logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
