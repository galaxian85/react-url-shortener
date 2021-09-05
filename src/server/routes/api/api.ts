/* eslint-disable new-cap */
import express from 'express';
import {router as loginRouter} from './login';
import {router as memberRouter} from './member';
import {router as urlRouter} from './url';

const router = express.Router();
router.use('/api/url', urlRouter);
router.use('/api/member', memberRouter);
router.use('/api/login', loginRouter);

export {router};
