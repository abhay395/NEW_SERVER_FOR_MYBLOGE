import express from 'express';
import { SendMeassage } from '../controller/Contact.controller.js';

const router = express.Router();

router.get('/sendMessage', SendMeassage);

export default router;