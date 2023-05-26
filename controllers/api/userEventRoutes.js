const router = require('express').Router()
const { User, UserEvent } = require('../../models')

// Endpoint - /user-event

// Get all user events
router.get('/', async (req, res) => {
  try {
    const userEvents = await UserEvent.findAll({
      include: [{ model: User, as: 'user', attributes: ['name'] }]
    })
    res.status(200).json(userEvents)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get a single user event by ID
router.get('/:id', async (req, res) => {
  try {
    const userEvent = await UserEvent.findByPk(req.params.id, {
      include: [{ model: User, as: 'user', attributes: ['name'] }]
    })

    if (!userEvent) {
      res.status(404).json({ message: 'No user event found with this id!' })
      return
    }

    res.status(200).json(userEvent)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Create a new user event
router.post('/', async (req, res) => {
  try {
    const userEventData = await UserEvent.create(req.body)
    res.status(201).json(userEventData)
  } catch (err) {
    res.status(400).json(err)
  }
})

// Update a user event by ID
router.put('/:id', async (req, res) => {
  try {
    const userEvent = await UserEvent.findByPk(req.params.id)

    if (!userEvent) {
      res.status(404).json({ message: 'No user event found with this id!' })
      return
    }

    await userEvent.update(req.body)

    res.status(200).json({ message: 'User event updated successfully!' })
  } catch (err) {
    res.status(500).json(err)
  }
})

// Delete a user event by ID
router.delete('/:id', async (req, res) => {
  try {
    const userEvent = await UserEvent.findByPk(req.params.id)

    if (!userEvent) {
      res.status(404).json({ message: 'No user event found with this id!' })
      return
    }

    await userEvent.destroy()

    res.status(200).json({ message: 'User event deleted successfully!' })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
