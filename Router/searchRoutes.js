import express from 'express';
import { searchProperties } from '../Controllers/searchController.js';
const router = express.Router();

router.get('/landTrade',searchProperties)


export default router