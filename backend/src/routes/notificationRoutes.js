import express from 'express';
import { acceptBooking, rejectBooking , getNotifications} from '../controllers/bookingControllers.js';

const router = express.Router();

router.put('/accept/:bookingId', acceptBooking);
router.put('/reject/:bookingId', rejectBooking);
router.get('/:touristEmail', getNotifications);

export default router;
