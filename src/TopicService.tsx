import { database } from "./firebase";
import { ref, set } from "firebase/database";

export class TopicService{
    
    public createTopic(topic: Topic): void {
        set(ref(database, 'topics/' + topic.id), {
            title: topic.title,
            description: topic.description,
            last_edited_date: topic.last_edited_date
        });
    }

    public getTopics(): Topic[] {
        return [];
    }

    public getTopic(topicId: number): Topic {
        return {id: 1, description: '',last_edited_date: new Date(), title: ""};
    }

    public deleteTopic(topicId: number): void {
        
    }
}