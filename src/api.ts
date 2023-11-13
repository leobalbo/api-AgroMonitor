import express from 'express';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';
import mysql from 'mysql2/promise';
import dbConfig from './utils/dbConfig';

export const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));
app.use(urlencoded({ extended: true }));
app.use(json());

const data = {
  temperature: 0,
  humidity: 0
};

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.status(200).send({ status: 'AgroMonitor' });
});

const api = express.Router();

// Receber os dados do Arduino
app.post('/postData', (req, res) => {
  const temperature = req.body.temperature;
  const humidity = req.body.humidity;

  data.temperature = temperature;
  data.humidity = humidity;

  console.log(`Temperatura: ${temperature}°C, Umidade: ${humidity}%`);

  res.status(200).send('Dados recebidos com sucesso.');
});

// Pegar dados da API
app.get('/getData', (req, res) => {
  res.status(200).send(data);
});

// Endpoint para obter os últimos 4 registros do banco de dados
app.get('/gethistoric', async (req, res) => {
  // TODO: Caching
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.query(
      'SELECT * FROM agroMonitor ORDER BY id DESC LIMIT 4'
    );

    await connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao obter registros do banco de dados:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Version the API
app.use('/api/v1', api);
