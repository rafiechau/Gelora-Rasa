const { Router } = require('express')
const authRoute = require('./authRoute')
const categoryRoute = require('./categoryRoute')
const eventRoute = require('./eventRoute')
const locationRoute = require('./locationRoute')
const orderRoute = require('./orderRoute')
const eventOrganizerRoute = require('./eventOrganizerRoute')
const streamingRoute = require('./streamingRoute')
const router = Router()

router.use('/auth', authRoute)
router.use('/categories', categoryRoute)
router.use('/events', eventRoute)
router.use('/location', locationRoute)
router.use('/orders', orderRoute)
router.use('/event-organizer', eventOrganizerRoute)
router.use('/streaming', streamingRoute)

module.exports = router;