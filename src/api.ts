import express from 'express';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';

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

// Receber os dados do arduino
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

// Version the api
app.use('/api/v1', api);
