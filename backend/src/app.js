import './bootstrap';

import Youch from 'youch';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import io from 'socket.io';
import http from 'http';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);
    this.clients = {};

    this.socket();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  socket() {
    this.io = io(this.server);

    this.io.on('connection', socket => {
      const { user_id } = socket.handshake.query;
      this.clients[user_id] = socket.id;

      socket.on('disconnect', () => {
        delete this.clients[user_id];
      });
    });
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      req.io = this.io;
      req.clients = this.clients;

      next();
    });
  }

  routes() {
    this.app.use(routes);
  }

  exceptionHandler() {
    this.app.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal Server error' });
    });
  }
}

export default new App().server;
