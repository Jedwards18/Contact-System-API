import express from 'express';
import * as http from 'http';
import cors from 'cors';

import applicationRouter from './routes/applicationRouter';
import { logEvent, Events, LogLevels } from './services/logging';

if (!process.env.NODE_ENV) {
  console.error(
    'NO ENVIRONMENT SET. You can set your machine\'s NODE_ENV by setting the Windows Environment Variables PATH \n EG NODE_ENV=development \n $env:NODE_ENV="development" ',
  );
  process.exit(0);
}

const app = express();
app.use(cors()); //check on this
app.use(express.urlencoded({ extended: true })); //check on this
app.use(express.json({ limit: '3.5MB' })); //check on this

app.use('/', applicationRouter);

//error handler
app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
  }
  res.status(error.code || 500);
  res.send(error.message);
});

const server = http.createServer(app);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  logEvent(LogLevels.Info, Events.Other, `Server Started on port ${port} (ENV = ${process.env.NODE_ENV})`);
});

process.on('SIGTERM', function () {
  logEvent(LogLevels.Info, Events.SigTerm, 'Received SIGTERM, shutting down server');
  server.close();
  process.exit(0);
});
