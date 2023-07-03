export class CommentSaveModel {
    public content: string;
    public author: string;
    public topic: string;

    constructor(content: string, authorIRI: string, topicIRI: string) {
        this.content = content;
        this.author = authorIRI;
        this.topic = topicIRI;
    }
}