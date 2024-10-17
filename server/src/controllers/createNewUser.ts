import express from 'express';

export async function createNewUser(req: express.Request, res: express.Response) {
    const { userData } = req.body;
    try {
        console.log(userData);
        return res.status(200).json({ msg: "User created" });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}