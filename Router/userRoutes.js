import express from 'express';
import { loginUser,registerUser } from '../Controllers/authController.js';



const router = express.Router();

//authen
router. post ('/register', registerUser)
router. post ('/login', loginUser)
// router. post ('/verify-email', verifyEmailUser)




export default router