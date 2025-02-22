import express from 'express';
import { createKYC,getAllKYCs } from '../controllers/kycControllers.js';
import uploadImages from '../middlewares/multerMiddlewares.js';

const router = express.Router();

router.post('/create', uploadImages,createKYC);
router.get('/',getAllKYCs)

export default router ;
