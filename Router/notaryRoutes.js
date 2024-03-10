import express from 'express';
import { updateStatusUser, createCertificate, updateCerfiticate } from '../Controllers/notaryController.js'
import { protect, authNotary } from '../Middleware/authMiddleware.js';


const router = express.Router();

//verify status User Kyc
router.put('/verifyStatusUserKYC', protect, authNotary, updateStatusUser)
//create Certificate
router.post('/createCertificate',protect, createCertificate)
//update Certificate
router.put('/updateCerfiticate', protect, updateCerfiticate)



export default router