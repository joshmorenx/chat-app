import express from 'express';
import User from '../models/User';
import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserInterface } from "../interfaces/UserInterface";

export async function preCreateNewUser(req: express.Request, res: express.Response) {
    const secret = process.env.SECRET
    const { userData } = req.body;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    try {

        function generateFourDigitNumber(): string {
            const randomBuffer = randomBytes(2); // 2 bytes = 16 bits
            const randomNumber = randomBuffer.readUInt16LE(0) % 10000; // Limitar a 4 dígitos
            return String(randomNumber).padStart(4, '0'); // Asegurarse de que tenga 4 dígitos
        }

        const fourDigitNumber = generateFourDigitNumber();

        const existingUser = await User.findOne({ username: userData.username });
        const existingEmail = await User.findOne({ email: userData.email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const latestUser = await User.findOne({}).sort({ id: -1 });
        const id: number = latestUser ? latestUser.id + 1 : 1;

        const createUserResult: UserInterface = await User.create({
            id,
            fullname: userData.fullname,
            username: userData.username,
            birthdate: userData.date,
            email: userData.email,
            password: userData.password,
            isLogged: false,
            permissions: [],
            profilePicture: "",
            galleryPictures: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            theme: "light",
            confirmedRegistration: false,
            passwordRecoveryUsedTokens: [],
            activationCode: fourDigitNumber
        });

        if (createUserResult) {         
            if (process.env.SECRET) {
                const token: string = jwt.sign({ username: userData.username, activationCode: fourDigitNumber }, process.env.SECRET, {
                    expiresIn: '5m',
                })

                // encode token so token will not have special characters
                // const encodedToken = btoa(token)
                const encodedToken = Buffer.from(token).toString('base64')

                let mail = {
                    from: process.env.EMAIL,
                    to: userData.email,
                    subject: "Registration confirmation",
                    html: `<p>be quick, this link will expire in 5 minutes. enter the following 4 digit code to activate your account: <br>${fourDigitNumber}</p>`,
                }
                transporter.sendMail(mail, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("email sent");
                        return res.status(200).json({ msg: "User has been created" });
                    }
                })
            }
        } else {
            return res.status(500).json({ error: "Error creating the user" });
        }
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}