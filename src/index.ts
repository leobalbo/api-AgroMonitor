import { config } from 'dotenv';
import moment from 'moment-timezone';

if (process.env.NODE_ENV !== 'production') {
  config();
}

// call after config() to access the env variables
import { app } from './api';

const port = process.env.PORT || 3333;

app.listen(port, () => {
  const horaAtual = moment()
    .tz('America/Sao_Paulo')
    .format('YYYY-MM-DD HH:mm:ss');

  console.log(
    `Server is running on http://localhost:${port} - Current time: ${horaAtual}`
  );
});
