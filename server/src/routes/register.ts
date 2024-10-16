import express from 'express';
const router = express.Router();
import { createNewUser } from '../controllers/createNewUser';

export default function register() {
    router.post('/api/register', createNewUser)
    return router
}