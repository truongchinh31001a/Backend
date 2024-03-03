import express from 'express';
import { updateStatusUser } from '../Controllers/notaryController.js'

import { protect, authNotary } from '../Middleware/authMiddleware.js';


const router = express.Router();

//verify status User Kyc
router.get('/verifyUserKYC', protect, authNotary, updateStatusUser)




export default router