import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { notFound } from './middleware/notFound';
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/swagger.json";
import { RegisterRoutes } from "./routes/routes"; 
import { errorHandler } from "./middleware/errorHandler";
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:7000',
];

// Apply CORS globally
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin === 'null' || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);


RegisterRoutes(app);

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404 handler
app.use(notFound);
app.use(errorHandler);

export default app;

