import { Schema, model } from "mongoose";
import { UserInterface } from "../interfaces/UserInterface";

const UserSchema:Schema = new Schema<UserInterface>({
    id: { type: Number, unique: true },
    fullname: { type: String },
    username: { type: String, unique: true },
    birthdate: { type: Date },
    email: { type: String, unique: true },
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

const User = model<UserInterface>("User", UserSchema);

export default User;