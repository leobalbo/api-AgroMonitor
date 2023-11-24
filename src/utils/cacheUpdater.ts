import cron from 'node-cron';
import { updateCache } from './cache';
const brasiliaTimeZone = 'America/Sao_Paulo';

cron.schedule(
  '59 23 * * *',
  async () => {
    const date = new Date().toLocaleString('en-US', {
      timeZone: brasiliaTimeZone
    });
    console.log('Scheduled task started at', date);
    try {
      await updateCache();
      console.log('Update cache successful at', date);
    } catch (error) {
      console.error('Error updating cache:', error);
    }
  },
  {
    scheduled: true,
    timezone: brasiliaTimeZone
  }
);
