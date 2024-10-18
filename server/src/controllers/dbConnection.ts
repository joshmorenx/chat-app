import mongoose from "mongoose";

export default async function dbconnection() {
    const mongoUrl = process.env.MONGO_URL;
    try {
        if (!mongoUrl) {
            throw new Error('MONGO_URL must be defined');
        } else {
            await mongoose
                .connect(mongoUrl)
                .then((response) => {
                    console.log('connected to MongoDB');
                })
                .catch((error) => {
                    console.log('error connecting to MongoDB', error);
                })
        }
    } catch (error) {
        console.log('error connecting to MongoDB', error);
    }
}