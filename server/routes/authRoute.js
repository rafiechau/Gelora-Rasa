const express = require('express')
const { register, verifyEmail, checkOtpVerifyEmail, login, forgotPassword, setResetPassword } = require('../controllers/authController');
const { verifyEmailMiddleware } = require('../middlewares/verifyEmailMiddleware');
const { verifySendResetMiddleware } = require('../middlewares/sendResetPassMiddleware');
const router = express.Router()

router.post('/register', register)
router.post('/verify-email', verifyEmail);
router.post('/check-otp', verifyEmailMiddleware, checkOtpVerifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", verifySendResetMiddleware, setResetPassword);

module.exports = router;