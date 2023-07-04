import { UserSaveModel } from "../models/UserSaveModel";
import { api } from "./ApiService";

let userPath = "api/users";

async function getAllUsersEmails(): Promise<{ email: string }[]> {
    const getAllUsersResponse = await api.get(userPath);
    const data = getAllUsersResponse.data;
    return data["hydra:member"].map((u: any): { email: string } => {
        return {
            email: u.email
        }
    });
}

export async function getUserById(userId: number): Promise<LightUser> {
    const getUserByIdResponse = await api.get(`${userPath}/${userId}`);
    const data = getUserByIdResponse.data;
    const topicResponseMapped: LightUser = {
        userId: data.id,
        email: data.email,
        username: getUsernameFromEmail(data.author.email)
    };
    
    return topicResponseMapped;
}

export async function saveUser(userToSave: UserSaveModel): Promise<LightUser> {
    if (await isEmailAlreadyUsed(userToSave.email)) {
        throw new AlreadyUsedError("Cet email est déjà utilisé.");
    }
    const saveUserResponse = await api.post(userPath, userToSave);
    const data = saveUserResponse.data;
    const savedUserMapped: LightUser = {
        userId: data.id,
        email: data.email,
        username: getUsernameFromEmail(data.email)
    }
    return savedUserMapped;
}

async function isEmailAlreadyUsed(email: string): Promise<boolean> {
    const userList = await getAllUsersEmails();
    return userList.findIndex((u) => u.email == email) !== -1;
}

export function getUsernameFromEmail(email: string): string {
    let username = email.split("@")[0];
    return username;
}