import { ConnectionOptions } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVariables = [
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_DATABASE'
];

for (const envVariable of requiredEnvVariables) {
  if (!process.env[envVariable]) {
    throw new Error(`A variável de ambiente ${envVariable} não está definida.`);
  }
}

const dbConfig: ConnectionOptions = {
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  port: Number(process.env.DB_PORT) || 3306,
  connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT) || 60000
};

export default dbConfig;
