import express from 'express';
const router = express.Router();
import { preCreateNewUser } from '../controllers/preCreateNewUser';

export default function register() {
    router.post('/api/preregister', preCreateNewUser)
    router.get('/api/preregister', (req: express.Request, res: express.Response) => {
        res.json({ msg: "Register route" })
    })
    return router
}