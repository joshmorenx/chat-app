import { Schema, model } from "mongoose";
import { User } from "../types/interfaces";

const UserSchema:Schema = new Schema<User>({
    id: { type: Number, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String },
    isLogged: { type: Boolean, default: false },
    permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
    profilePicture: { type: String },
    galleryPictures: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    theme: { type: String, default: "light" },
    confirmedRegistration: { type: Boolean, default: false },
    passwordRecoveryUsedTokens: [{ type: String }],
});

const User = model<User>("User", UserSchema);

export default User;