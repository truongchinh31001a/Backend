import express from 'express';
import { loginUser,getLoginMessage } from '../Controllers/authController.js';



const router = express.Router();

//authen
router. get ('/getLoginMessage', getLoginMessage)
router. post ('/login', loginUser)
// router. post ('/verify-email', verifyEmailUser)




export default router