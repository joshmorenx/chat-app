export interface UserInterface {
    id: number;
    fullname: string;
    username: string;
    birthdate: Date;
    email: string;
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