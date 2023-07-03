import { TopicSaveModel } from "../models/TopicSaveModel";
import { getUsernameFromEmail } from "./UserService";
import { apiUrl } from "./ApiService";
import { getApiToken, getConnectedUserId } from "./AuthService";

const topicPath = "api/topics";
export const topicApiUrl = apiUrl + topicPath;

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

export async function getAllTopicsForUser(userId: number): Promise<TopicListItem[]> {
    const response = await fetch(topicApiUrl + `?author=${userId}`);
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
    const response = await fetch(topicApiUrl + `/${topicId}`);
    const data = await response.json();
    const topicResponseMapped: TopicDetail = {
        topicIRI: data["@id"],
        topicId: data.id,
        title: data.name,
        description: data.description,
        creation_date: data.createdAt,
        author: {
            userId: data.author.id,
            email: data.author.email,
            username: getUsernameFromEmail(data.author.email)
        }
    };
    return topicResponseMapped;
}

export async function saveTopic(topicToSave: TopicSaveModel): Promise<number> {
    const apiToken = getApiToken();
    if (apiToken === undefined || apiToken.length < 1) {
        throw new Error('401 Unauthorized');
    }
    const response = await fetch(topicApiUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(topicToSave)
    });

    if (response.ok) {
        const topic = await response.json();
        return topic.id;
    } else {
        return 0;
    }
}

export async function deleteTopic(topicId: number): Promise<boolean> {
    const topicToDelete = await getTopic(topicId);
    const apiToken = getApiToken();
    if (topicToDelete.author.userId !== getConnectedUserId() || apiToken === undefined || apiToken.length < 1) {
        throw new Error('401 Unauthorized');
    }
    const response = await fetch(topicApiUrl + `/${topicId}`, {
        method: "DELETE",
        headers: {
            "'Authorization": `Bearer ${apiToken}`,
        }
    });
    return response.ok;
}