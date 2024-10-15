import express from 'express';
import cors from 'cors';
import register from './routes/register';
const app = express();
const router = express.Router();

const allowedOrigins: string[] = [
    'http://localhost:3000',
    'http://localhost:8081',
]

app.use(cors({
    origin: allowedOrigins
}));

app.use('/', register());

app.listen(3000, () => {
    console.log('Server started on port 3000');
})