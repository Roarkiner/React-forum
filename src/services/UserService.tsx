import { UserSaveModel } from "../models/UserSaveModel";
import { api } from "./ApiService";

let userPath = "api/users";

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
    const saveUserResponse = await api.post(userPath, userToSave)
    .catch(error => {
        throw error;
    });
    const data = saveUserResponse.data;
    const savedUserMapped: LightUser = {
        userId: data.id,
        email: data.email,
        username: getUsernameFromEmail(data.email)
    }
    return savedUserMapped;
}

export function getUsernameFromEmail(email: string): string {
    let username = email.split("@")[0];
    return username;
}