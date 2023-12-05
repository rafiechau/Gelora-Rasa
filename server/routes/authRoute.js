const express = require('express')
const { register, verifyEmail, checkOtpVerifyEmail, login } = require('../controllers/authController');
const { verifyEmailMiddleware } = require('../middlewares/verifyEmailMiddleware');
const router = express.Router()

router.post('/register', register)
router.post('/verify-email', verifyEmail);
router.post('/check-otp', verifyEmailMiddleware, checkOtpVerifyEmail);
router.post("/login", login);

module.exports = router;