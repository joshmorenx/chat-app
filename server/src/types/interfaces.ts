import { Document } from "mongoose";
export interface User extends Document {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    isLogged: boolean;
    permissions: string[];
    profilePicture: string;
    galleryPictures: string[];
    createdAt: Date;
    updatedAt: Date;
    theme: string;
    confirmedRegistration: boolean;
    passwordRecoveryUsedTokens: string[];
}