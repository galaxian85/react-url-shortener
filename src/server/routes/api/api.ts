import express from 'express';
import { router as urlRouter } from './url';

const router = express.Router();
router.use('/api', urlRouter);

export { router };
