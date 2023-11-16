// cache.ts
import redis from 'redis';
import util from 'util';
import { fetchDataFromDatabase, insertDataIntoDatabase } from './database';
import { calculateAverage } from './average';

const cacheKey = 'historicData';
const redisClient = redis.createClient();
const redisGetAsync = util.promisify(redisClient.get).bind(redisClient);
const redisSetAsync = util.promisify(redisClient.set).bind(redisClient);

export const getCacheData = async (): Promise<any> => {
  try {
    const cachedData = await redisGetAsync(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData || '[]');
    } else {
      const databaseData = await fetchDataFromDatabase();

      await setCacheData(databaseData);

      return databaseData;
    }
  } catch (error) {
    console.error('Error while fetching data from cache or database:', error);
    return [];
  }
};

export const setCacheData = async (data: any): Promise<void> => {
  try {
    await redisSetAsync(cacheKey, JSON.stringify(data));
  } catch (error) {
    console.error('Error while setting data in cache:', error);
  }
};

export const updateCache = async () => {
  console.log('Atualizando o cache...');
  try {
    const currentDate = new Date();
    const average = calculateAverage();

    await insertDataIntoDatabase(
      average.averageTemperature,
      average.averageHumidity,
      currentDate
    );

    const updatedData = await fetchDataFromDatabase();
    await setCacheData(updatedData);

    console.log('Cache atualizado com sucesso.');
  } catch (error) {
    console.error('Erro ao atualizar o cache:', error);
  }
};
