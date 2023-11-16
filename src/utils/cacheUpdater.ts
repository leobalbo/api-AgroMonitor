import cron from 'node-cron';
import { updateCache } from './cache';

cron.schedule('59 23 * * *', async () => {
  updateCache();
});
