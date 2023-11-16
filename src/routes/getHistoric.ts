import express, { Request, Response } from 'express';
import { getCacheData } from '../utils/cache';

const router = express.Router();

// Cache and retrieve data from Redis
const cache: express.RequestHandler = async (
  req: Request,
  res: Response,
  next: express.NextFunction
) => {
  try {
    const cachedData = await getCacheData();

    if (cachedData.length > 0) {
      console.log('Fetching data from cache');
      res.status(200).json(cachedData);
    } else {
      next();
    }
  } catch (error) {
    console.error('Error while fetching data from cache:', error);
    next();
  }
};

router.get('/', cache, async (req: Request, res: Response) => {
  try {
    const cachedData = await getCacheData();

    res.status(200).json(cachedData);
  } catch (error) {
    console.error('Error fetching records from the database:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
