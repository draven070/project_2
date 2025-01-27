import express from 'express';
import cors from 'cors';
import {
  signupTourist,
  loginTourist,
  logoutTourist,
  updateTourist,
} from '../controllers/touristControllers.js';

const router = express.Router();

// POST /api/tourists/signup
router.post('/signup', signupTourist);

// POST /api/tourists/login
router.post('/login', loginTourist);

// POST /api/tourists/logout
router.post('/logout', logoutTourist);

// PUT /api/tourists/update
router.put('/update', updateTourist);

export default router;
