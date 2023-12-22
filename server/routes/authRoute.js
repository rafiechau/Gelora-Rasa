const express = require('express')
const { register, verifyEmail, checkOtpVerifyEmail, login, forgotPassword, setResetPassword, getProfile, editProfile, editPhotoProfile, getAllUsers, deleteUserByAdmin, deleteUser } = require('../controllers/authController');
const { multerMiddleware } = require('../utils/multer');
const { verifyEmailMiddleware } = require('../middlewares/verifyEmailMiddleware');
const { verifySendResetMiddleware } = require('../middlewares/sendResetPassMiddleware');
const { authenticationMiddleware } = require('../middlewares/AuthenticationMiddleware');
const { authorizationRoleAdmin } = require('../middlewares/AuthorizationRole');
const router = express.Router()

router.post('/register', register)
router.post('/verify-email', verifyEmail);
router.post('/check-otp', verifyEmailMiddleware, checkOtpVerifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", verifySendResetMiddleware, setResetPassword);

router.get('/profile', authenticationMiddleware, getProfile)
router.put("/edit/photoProfile", authenticationMiddleware, multerMiddleware, editPhotoProfile);
router.put("/edit/profile", authenticationMiddleware, editProfile);

router.get('/all-users', authenticationMiddleware, authorizationRoleAdmin, getAllUsers);
router.delete('/delete-user-by-admin/:userId', authenticationMiddleware, authorizationRoleAdmin, deleteUserByAdmin)
router.delete('/delete-account', authenticationMiddleware, deleteUser)

module.exports = router;