import express from 'express';
const router = express.Router();
import { createNewUser } from '../controllers/createNewUser';

export default function register(): express.Router {
    router.get('/', createNewUser)
    return router
}