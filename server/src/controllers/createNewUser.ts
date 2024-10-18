import express from 'express';
import User from '../models/User';

export async function createNewUser(req: express.Request, res: express.Response) {
    const { userData } = req.body;
    try {
        console.log(userData);
        return res.status(200).json({ msg: "User created" });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}