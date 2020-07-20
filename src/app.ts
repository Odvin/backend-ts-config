import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import { corsUrl, routerLog, parserOptions } from './config';

import auth from './routers/api/auth.router';
import users from './routers/api/users.router';

import errors from './routers/error';
import maintenance from './routers/maintenance';

const app = express();

if (routerLog.active) app.use(morgan(routerLog.format));

app.use(bodyParser.json(parserOptions.json));
app.use(bodyParser.urlencoded(parserOptions.urlencoded));

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

app.use(maintenance);

app.use(errors.unhandled);
app.use(errors.handler);

export default app;
