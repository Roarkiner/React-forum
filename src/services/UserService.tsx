import { apiUrl } from "./ApiService";

let userPath = "api/users";
let userApiUrl = apiUrl + userPath;

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