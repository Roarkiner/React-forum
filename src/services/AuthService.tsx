import Cookies from "js-cookie"
import { apiUrl } from "./ApiService";
import jwt_decode from "jwt-decode";

export function isUserAuthenticated(): boolean {
    return getApiToken() !== undefined;
}

export function getApiToken(): string | undefined {
    return Cookies.get("apiToken");
}

export function getConnectedUserIRI(): string  {
    var token = getApiToken();
    if(token === undefined)
        return "";
    
    var decodedToken: any = jwt_decode(token);
    return decodedToken.user;
}

export function getConnectedUserId(): number {
    const userIRI = getConnectedUserIRI();
    const userIRISplitted = userIRI.split("/");
    return Number(userIRISplitted[userIRISplitted.length - 1]);
}

export async function loginUser(email: string, password: string): Promise<{ token: string }>{
    const response = await fetch(apiUrl + "api/login_check", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: email, password: password})
    });
    if(response.ok) {
        const responseJson = await response.json();
        const apiToken = responseJson.token;

        Cookies.set('apiToken', apiToken, { expires: 7 });
        return { token: apiToken };
    } else {
        return { token: "" };
    }
}

export function disconnectUser(): void {
    Cookies.remove('apiToken');
}