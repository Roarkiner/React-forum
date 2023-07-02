export class TopicSaveModel {
    public name: string;
    public description: string;
    public author: string;
    public createdAt: string;
    public comments: string[];
    
    constructor(name: string, description:string, authorId: number){
        this.name = name;
        this.description = description;
        this.author = authorId.toString();
        this.createdAt = new Date().toDateString();
        this.comments = [];
    }
}