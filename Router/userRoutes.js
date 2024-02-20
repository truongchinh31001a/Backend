import express from 'express';
import { loginUser,getLoginMessage } from '../Controllers/authController.js';
import { sendEmailOTP, getAllUser,putUserKYC } from '../Controllers/userController.js';
import {protect} from '../Middleware/authMiddleware.js';
import {validateFields} from '../Middleware/validateMiddleware.js'

const router = express.Router();

//auth
router. get ('/getLoginMessage', getLoginMessage)
router. post ('/login', loginUser)
// User KYC
// verify email
router.post('/sendEmail',protect ,sendEmailOTP) 
// router.post('/verifyOTP',protect ,verifyEmailOTP)
//Get user info
router.get('/userinfo',protect ,getAllUser)
//Put  user Kyc
router.put('/userKYC',protect,validateFields,putUserKYC)




export default router