const express = require('express')
const { register, verifyEmail, checkOtpVerifyEmail } = require('../controllers/authController');
const { verifyEmailMiddleware } = require('../middlewares/verifyEmailMiddleware');
const router = express.Router()

router.post('/register', register)
router.post('/verify-email', verifyEmail);
router.post('/check-otp', verifyEmailMiddleware, checkOtpVerifyEmail);

module.exports = router;