export function getUsernameFromEmail(email: string): string{
    let username = email.split("@")[0];
    return username;
}