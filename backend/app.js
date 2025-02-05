//dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Router from './Routes/User.routes.js';

//load environment variables
dotenv.config();

//initialize express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//cors
app.use(
  cors({
    origin: 'http://localhost:4173',
    credentials: true
  })
);

app.use('/user', Router);
//export express app
export default app;
