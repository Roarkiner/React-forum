import Cookies from "js-cookie"
import { apiUrl } from "./ApiService";
import { getUserIdFromEmail } from "./UserService";

export function isUserAuthenticated(): boolean {
    return getApiToken() !== undefined;
}

export function getApiToken(): string | undefined {
    return Cookies.get("apiToken");
}

export function getConnectedUserId(): number  {
    return Number(Cookies.get("userId"));
}

export async function loginUser(email: string, password: string): Promise<{ token: string }>{
    const response = await fetch(apiUrl + "/login_check", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: email, password: password})
    });
    if(response.ok) {
        const responseJson = await response.json();
        const apiToken = responseJson.token;

        const userId = await getUserIdFromEmail(email);
        if(userId === 0){
            return { token: "" }
        }

        Cookies.set('apiToken', apiToken, { expires: 7 });
        Cookies.set('userId', userId.toString(), { expires: 7 } )
        return { token: apiToken };
    } else {
        return { token: "" };
    }
}

export function disconnectUser(): void {
    Cookies.remove('apiToken');
    Cookies.remove('userId');
}