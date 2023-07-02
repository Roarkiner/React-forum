import Cookies from "js-cookie"
import { apiUrl } from "./ApiService";

export function isUserAuthenticated(): boolean {
    return getApiToken() !== undefined;
}

function getApiToken(): string | undefined {
    return Cookies.get("apiToken");
}

export async function loginUser(email: string, password: string): Promise<{ token: string }>{
    try{
        const response = await fetch(apiUrl + "/login_check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: email, password: password})
        });
        if(response.ok) {
            const responseJson  = await response.json();
            const apiToken = responseJson.token;
    
            Cookies.set('apiToken', apiToken, { expires: 7 });
    
            return { token: apiToken };
        } else {
            return { token: "" };
        }

    } catch(error) {
        console.error('Error occurred during login:', error);
        throw new Error('An unexpected error occurred. Please try again later.');
    }
}

export function disconnectUser(): void {
    Cookies.remove('apiToken');
}