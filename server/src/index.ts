require('dotenv').config();

import express from 'express';
import cors from 'cors';
import register from './routes/register';
import dbConnection from './controllers/dbConnection';

const app = express();

const allowedOrigins: string[] = [
    'http://localhost:3000',
    'http://localhost:8081',
]

dbConnection();

app.use(cors({
    origin: allowedOrigins
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', register());

app.listen(3000, () => {
    console.log('Server started on port http://localhost:3000');
})