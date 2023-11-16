// healthCheck.ts
import express, { Request, Response } from 'express';

const router = express.Router();

// Healthcheck endpoint
router.get('/', (req: Request, res: Response) => {
  res.status(200).send({ status: 'AgroMonitor' });
});

export default router;
