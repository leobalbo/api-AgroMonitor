import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import healthCheck from './routes/healthCheck';
import getData from './routes/getData';
import postData from './routes/postData';
import getHistoric from './routes/getHistoric';

export const app = express();

// Configurar o bodyParser para analisar o corpo das solicitações como JSON
app.use(bodyParser.json());

// Usar o middleware Helmet para melhorar a segurança
app.use(helmet());

// Rotas
app.use('/', healthCheck);
app.use('/getData', getData);
app.use('/postData', postData);
app.use('/gethistoric', getHistoric);
