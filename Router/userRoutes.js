import express from 'express';
import { loginUser,getLoginMessage } from '../Controllers/authController.js';
import { sendEmailOTP,verifyEmailOTP } from '../Controllers/userController.js';
import protect from '../Middleware/authMiddleware.js';

const router = express.Router();

//authen
router. get ('/getLoginMessage', getLoginMessage)
router. post ('/login', loginUser)
// User KYC
router.post('/sendEmail',protect ,sendEmailOTP)
router.post('/veifyOTP', verifyEmailOTP)




export default router