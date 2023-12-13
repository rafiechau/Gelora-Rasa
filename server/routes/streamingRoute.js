const express = require('express');

const { authenticationMiddleware } = require('../middlewares/AuthenticationMiddleware');
const {  authorizationRoleStandardUser } = require('../middlewares/AuthorizationRole');
const { sendMeetinIdToUser } = require('../controllers/liveStreamingController');

const router = express.Router()

router.post('/send-meeting', authenticationMiddleware, sendMeetinIdToUser)

module.exports = router;