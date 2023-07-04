import { CommentSaveModel } from "../models/CommentSaveModel";
import { apiUrl } from "./ApiService";
import { getApiToken, getConnectedUserId } from "./AuthService";
import { topicApiUrl } from "./TopicService";
import { getUsernameFromEmail } from "./UserService";

const commentPath = "api/comments";
const commentApiUrl = apiUrl + commentPath;

export async function getCommentsForTopicId(topicId: number): Promise<CommentListItem[]>{
    const response = await fetch(topicApiUrl + `/${topicId}/comments`);
    const data = await response.json();
    const commentsResponseMapped: CommentListItem[] = data["hydra:member"].map((comment: any): CommentListItem => {
        return {
            commentId: comment.id,
            content: comment.content,
            creation_date: comment.createdAt,
            author: {
                userId: comment.author.id,
                email: comment.author.email,
                username: getUsernameFromEmail(comment.author.email)
            }
        }
    })
    return commentsResponseMapped;
}

export async function getComment(commentId: number): Promise<CommentListItem>{
    const response = await fetch(commentApiUrl + `/${commentId}`);
    const data = await response.json();
    const commentResponseMapped: CommentListItem = {
        commentId: data.id,
        content: data.content,
        creation_date: data.createdAt,
        author: {
            userId: data.author.id,
            email: data.author.email,
            username: getUsernameFromEmail(data.author.email)
        }
    };
    return commentResponseMapped;
}

export async function saveComment(commentSaveModel: CommentSaveModel): Promise<boolean>{
    const apiToken = getApiToken();
    if (apiToken === undefined || apiToken.length < 1) {
        throw new Error("Veuillez vous connecter pour ajouter un commentaire.");
    }
    const reponse = await fetch(commentApiUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentSaveModel)
    });

    return reponse.ok;
}

export async function deleteComment(commentId: number): Promise<boolean>{
    const commentToDelete = await getComment(commentId);
    const apiToken = getApiToken();
    if (apiToken === undefined || apiToken.length < 1 || getConnectedUserId() !== commentToDelete.author.userId) {
        throw new Error("Veuillez vous connecter pour ajouter un commentaire.");
    }
    const response = await fetch(commentApiUrl + `/${commentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${apiToken}`,
        }
    });
    return response.ok;
}