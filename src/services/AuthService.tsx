import jwt_decode from "jwt-decode";
import { api } from "./ApiService";
import { UserSaveModel } from "../models/UserSaveModel";
import { saveUser } from "./UserService";

export function isUserAuthenticated(): boolean {
    return getApiToken() !== null;
}

export function getApiToken(): string | null {
    return localStorage.getItem("apiToken");
}

export function getConnectedUserIRI(): string | null {
    const token = getApiToken();
    if (token === null)
        return null;

    const decodedToken: any = jwt_decode(token);
    return decodedToken.user;
}

export function getConnectedUserId(): number | null {
    const userIRI = getConnectedUserIRI();
    if (userIRI === null) {
        return null;
    }
    const userIRISplitted = userIRI.split("/");
    return Number(userIRISplitted[userIRISplitted.length - 1]);
}

export async function loginUser(email: string, password: string): Promise<void> {
    const loginUserResponse = await api.post("api/login_check", {
        username: email,
        password: password
    });
    const apiToken = loginUserResponse.data.token;
    setApiToken(apiToken);
}

export async function registerUser(userToRegister: UserSaveModel): Promise<void> {
    await saveUser(userToRegister);
    await loginUser(userToRegister.email, userToRegister.password);
}

function setApiToken(apiToken: string): void{
    localStorage.setItem("apiToken", apiToken);
}

function removeApiToken(): void {
    localStorage.removeItem("apiToken");
}

export function askUserForConnection(displayError: boolean = true, redirectUrl: string = "") {
    removeApiToken();
    const queryParams = new URLSearchParams({
        error: displayError ? "true" : "",
        redirectUrl: redirectUrl
    });
    window.location.href = `/login?${queryParams}`;
}

export function disconnectUser(): void {
    removeApiToken();
    window.location.href = "/";
}