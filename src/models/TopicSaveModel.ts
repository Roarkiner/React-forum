export class TopicSaveModel {
    public name: string;
    public description: string;
    public authorIRI: string;
    
    constructor(name: string, description:string, authorIRI: string){
        this.name = name;
        this.description = description;
        this.authorIRI = authorIRI;
    }
}