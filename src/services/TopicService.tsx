import { TopicSaveModel } from "../models/TopicSaveModel";
import { getUsernameFromEmail } from "./UserService";
import { apiUrl } from "./ApiService";

let topicPath = "/topics";
let topicApiUrl = apiUrl + topicPath;

export async function getAllTopics(): Promise<TopicListItem[]> {
    const response = await fetch(topicApiUrl);
    const data = await response.json();
    const topicResponseMapped: TopicListItem[] = data["hydra:member"].map((topic: any): TopicListItem => {
        return {
            topicId: topic.id,
            title: topic.name,
            description: topic.description,
            creation_date: topic.createdAt,
            author: {
                userId: topic.author.id,
                email: topic.author.email,
                username: getUsernameFromEmail(topic.author.email)
            },
            commentsCount: topic.commentsCount
        };
    });
    return topicResponseMapped;
}

export async function getTopic(topicId: number) {
    const response = await fetch(topicApiUrl + `/${topicId}`)
    const data = await response.json();
    const topicResponseMapped: TopicDetail = {
        topicId: data.id,
        title: data.name,
        description: data.description,
        creation_date: data.createdAt,
        author: {
            userId: data.author.id,
            email: data.author.email,
            username: getUsernameFromEmail(data.author.email)
        },
        comments: []
    };
    return topicResponseMapped;
}

export async function saveTopic(topicToAdd: TopicSaveModel): Promise<TopicDetail>{
    const response = await fetch(topicApiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(topicToAdd)
    });
    const topic = await response.json();
    return {
        topicId: topic.id,
        title: topic.name,
        description: topic.description,
        creation_date: topic.createdAt,
        author: {
            userId: topic.author.id,
            email: topic.author.email,
            username: getUsernameFromEmail(topic.author.email)
        },
        comments: []
    };
}