export class TopicSaveModel {
    public name: string;
    public description: string;
    public author: string;
    
    constructor(name: string, description:string, authorId: number){
        this.name = name;
        this.description = description;
        this.author = "/api/users/" + authorId.toString();
    }
}