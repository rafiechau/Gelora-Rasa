const { Router } = require('express')
const authRoute = require('./authRoute')
const categoryRoute = require('./categoryRoute')
const eventRoute = require('./eventRoute')
const locationRoute = require('./locationRoute')
const router = Router()

router.use('/auth', authRoute)
router.use('/categories', categoryRoute)
router.use('/events', eventRoute)
router.use('/location', locationRoute)

module.exports = router;