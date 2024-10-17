import express from 'express';
const router = express.Router();
import { createNewUser } from '../controllers/createNewUser';

export default function register() {
    router.post('/api/register', createNewUser)
    router.get('/api/register', (req: express.Request, res: express.Response) => {
        res.json({ msg: "Register route" })
    })
    return router
}