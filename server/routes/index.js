const { Router } = require('express')
const authRoute = require('./authRoute')
const router = Router()

router.use('/auth', authRoute)

module.exports = router;