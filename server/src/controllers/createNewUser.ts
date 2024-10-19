import express from 'express';
import User from '../models/User';

export async function createNewUser(req: express.Request, res: express.Response) {
    const { userData } = req.body;
    try {
        console.log(userData);

        const existingUser = await User.findOne({ username: userData.username });
        const existingEmail = await User.findOne({ email: userData.email });

        if(existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        if(existingEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const latestUser = await User.findOne({}).sort({ id: -1 });
        const id: number = latestUser ? latestUser.id + 1 : 1;

        const createUserResult = await User.create({
            id,
            fullname: userData.fullname,
            username: userData.username,
            birthdate: userData.date,
            email: userData.email,
            password: userData.password,
        });

        console.log(createUserResult);

        if (createUserResult) {
            return res.status(200).json({ msg: "User created" });
        } else {
            return res.status(500).json({ error: "Error creating user" });
        }
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}