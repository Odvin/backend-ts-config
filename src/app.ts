import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import { corsUrl, routerLog } from './config';

import coursers from './routers/api/courses';

const app = express();

if (routerLog.active) app.use(morgan(routerLog.format));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    extended: true,
    parameterLimit: 50000
  })
);
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

app.use('/api/v1/coursers', coursers);

export default app;
