import express, { Request, Response } from 'express';
import { insertValues } from '../utils/average';
import { runAsync } from '../utils/async';

const router = express.Router();

let data = {
  temperature: 0,
  humidity: 0
};
router.post(
  '/',
  runAsync(async (req: Request, res: Response) => {
    if (!req.body) {
      return res
        .status(400)
        .send('Corpo da solicitação ausente ou malformado.');
    }

    let { temperature, humidity } = req.body;

    data.temperature = temperature;
    data.humidity = humidity;

    if (temperature === undefined || humidity === undefined) {
      return res
        .status(400)
        .send(
          'Dados de temperatura ou umidade ausentes no corpo da solicitação.'
        );
    }

    console.log(`Temperatura: ${temperature}°C, Umidade: ${humidity}%`);

    insertValues(temperature, humidity);

    return res.status(200).send('Dados recebidos com sucesso.');
  })
);

export { data };

export default router;
