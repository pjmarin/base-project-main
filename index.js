"use strict";

const express = require('express');
const app = express();

const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const winston = require('winston');

const port = 3000;

app.use(cors());
app.use(helmet());

app.get('/', function (req, res) {
  logger.log('info', 'Llamada al sitio raiz');
  res.send('Hello World from nodejs basic app');
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error', format: winston.format.combine(winston.format.timestamp(), winston.format.json()) }),
    new winston.transports.File({ filename: 'combined.log', format: winston.format.combine(winston.format.timestamp(), winston.format.json()) })
  ],
});

const server = http.createServer(app);
/* Listen on provided port, on all network interfaces. */
server.listen(port);
// server.on("error", serverError);
// server.on("listening", serverListening);
// server.on("close", serverClose);