export class UserSaveModel {
    public userId: number;
    public email: string;
    public password: string;

    constructor(userId: number, email: string, password: string){
        this.userId = userId;
        this.email = email;
        this.password = password;
    }
}