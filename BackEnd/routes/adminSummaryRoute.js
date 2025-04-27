import express from 'express'
import { getAdminSummary } from "../controllers/adminController.js";
import adminAuth from '../middleware/adminAuth.js';

const router=express.Router();


router.get('/summary', adminAuth, getAdminSummary);

export default router;