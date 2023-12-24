const express = require('express');

const { authenticationMiddleware } = require('../middlewares/AuthenticationMiddleware');
const {  authorizationRoleStandardUser } = require('../middlewares/AuthorizationRole');
const { sendMeetinIdToUser, verifyUserForMeeting } = require('../controllers/liveStreamingController');

const router = express.Router()

router.post('/send-meeting', authenticationMiddleware, sendMeetinIdToUser)
router.post('/verify-user-for-meeting', authenticationMiddleware, verifyUserForMeeting)

module.exports = router;