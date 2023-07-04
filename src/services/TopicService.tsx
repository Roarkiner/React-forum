import { TopicSaveModel } from "../models/TopicSaveModel";
import { getUsernameFromEmail } from "./UserService";
import { api, createUnauthorizedError } from "./ApiService";
import { getConnectedUserId } from "./AuthService";

export const topicPath = "api/topics";

export async function getAllTopics(searchValue: string = "", page: number = 1, author: number = 0): Promise<GetAllTopicResponse> {
    const queryParams = new URLSearchParams({
        name: searchValue,
        page: page.toString(),
        author: author !== 0 ? author.toString() : ""
    });

    const getAllTopicsResponse = await api.get(`${topicPath}?${queryParams}`);
    const data = await getAllTopicsResponse.data;
    const getAllTopicsResponseMapped: TopicListItem[] = data["hydra:member"].map((topic: any): TopicListItem => {
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
    return {
        topicListItems: getAllTopicsResponseMapped,
        numberOfItems: data["hydra:totalItems"]
    };
}

export async function getTopic(topicId: number): Promise<TopicDetail> {
    const getTopicResponse = await api.get(`${topicPath}/${topicId}`);
    const data = getTopicResponse.data;
    const getTopicResponseMapped: TopicDetail = {
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
    return getTopicResponseMapped;
}

export async function saveTopic(topicToSave: TopicSaveModel): Promise<TopicDetail> {
    const saveTopicResponse = await api.post(topicPath, topicToSave);
    const data = saveTopicResponse.data;
    const saveTopicResponseMapped: TopicDetail = {
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
    return saveTopicResponseMapped;
}

export async function deleteTopic(topicId: number): Promise<void> {
    const topicToDelete = await getTopic(topicId);
    if (topicToDelete.author.userId !== getConnectedUserId()) {
        throw createUnauthorizedError();
    }
    await api.delete(`${topicPath}/${topicId}`);
}