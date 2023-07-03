import { UserSaveModel } from "../models/UserSaveModel";
import { apiUrl } from "./ApiService";
import { getApiToken } from "./AuthService";

let userPath = "api/users";
let userApiUrl = apiUrl + userPath;

async function getAllUsers(): Promise<{ email: string }[]> {
    const response = await fetch(userApiUrl);
    const data = await response.json();
    return data["hydra:member"].map((u: any): { email: string } => {
        return {
            email: u.email
        }
    });
}

async function isEmailAlreadyUsed(email: string): Promise<boolean> {
    const userList = await getAllUsers();
    return userList.findIndex((u) => u.email == email) !== -1;
}

export function getUsernameFromEmail(email: string): string {
    let username = email.split("@")[0];
    return username;
}

export async function getUserById(userId: number): Promise<LightUser> {
    const response = await fetch(userApiUrl + `/${userId}`);
    const data = await response.json();
    const topicResponseMapped: LightUser = {
        userId: data.id,
        email: data.email,
        username: getUsernameFromEmail(data.author.email)
    };

    return topicResponseMapped;
}

export async function saveUser(userToSave: UserSaveModel): Promise<string> {
    if (await isEmailAlreadyUsed(userToSave.email)) {
        throw new Error("Cet email est déjà utilisé.");
    }
    const response = await fetch(userApiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userToSave)
    });

    if (response.ok) {
        const user = await response.json();
        return user["@id"];
    } else {
        return "";
    }
}