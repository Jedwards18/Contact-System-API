import express from 'express';
import * as http from 'http';
import cors from 'cors';
import contactsRouter from './routes/contactsRouter';
import { logEvent } from './services/logger';
import { Events, LogLevels } from './enums/logging';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '3.5MB' }));

app.use('/', contactsRouter);

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
