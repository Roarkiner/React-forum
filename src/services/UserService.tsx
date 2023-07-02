import { apiUrl } from "./ApiService";

let userPath = "/users";
let userApiUrl = apiUrl + userPath;

export function getUsernameFromEmail(email: string): string{
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

export async function getUserIdFromEmail(userEmail: string): Promise<number>{
    const response = await fetch(userApiUrl);
    const data = await response.json();
    const topicResponseMapped: UserListItem[] = data["hydra:member"].map((user: any): UserListItem => {
        return {
            userId: user.id,
            email: user.email,
        };
    });
    const matchingUser = topicResponseMapped.find(({email}) => email === userEmail);
    if(matchingUser === undefined){
        return 0;
    }
    return matchingUser.userId;
}