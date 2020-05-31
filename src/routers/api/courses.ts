import express from 'express';

const router = express.Router();

import corsesController from '../../controllers/courses';

router.use('/info', corsesController.info);

export default router;
