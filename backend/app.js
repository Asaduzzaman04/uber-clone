//dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import  UserRouter  from './Routes/User.routes.js';
import  CaptainRouter  from './Routes/Captain.route.js';

//load environment variables
dotenv.config();

//initialize express app
const app = express();
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
//cors
app.use(
  cors({
    origin: 'http://localhost:4173',
    credentials: true
  })
);

//user routes middleware
app.use('/user', UserRouter);

//captain routes middleware
app.use('/captain', CaptainRouter);
//export express app
export default app;
