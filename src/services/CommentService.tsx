import { CommentSaveModel } from "../models/CommentSaveModel";
import { api, createUnauthorizedError } from "./ApiService";
import { getUsernameFromEmail } from "./UserService";
import { topicPath } from "./TopicService";
import { getConnectedUserId } from "./AuthService";

const commentPath = "api/comments";

export async function getCommentsForTopicId(topicId: number, page: number = 1): Promise<GetAllComments> {
    const getCommentsResponse = await api.get(`${topicPath}/${topicId}/comments?page=${page}`);
    const data = getCommentsResponse.data;
    const getCommentsResponseMapped: CommentListItem[] = data["hydra:member"].map((comment: any): CommentListItem => {
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
    });
    return {
        commentListItems: getCommentsResponseMapped,
        numberOfItems: data["hydra:totalItems"]
    };
}

async function getComment(commentId: number): Promise<CommentListItem> {
    const getCommentResponse = await api.get(`${commentPath}/${commentId}`);
    const data = getCommentResponse.data;
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

export async function saveComment(commentSaveModel: CommentSaveModel): Promise<CommentListItem> {
    const saveCommentResponse = await api.post(commentPath, commentSaveModel);
    const comment = saveCommentResponse.data;
    const commentWithResponse: CommentListItem = {
        commentId: comment.id,
        content: comment.content,
        creation_date: comment.createdAt,
        author: {
            userId: comment.author.id,
            email: comment.author.email,
            username: getUsernameFromEmail(comment.author.email)
        }
    }
    return commentWithResponse;
}

export async function deleteComment(commentId: number): Promise<void> {
    const commentToDelete = await getComment(commentId);
    if (commentToDelete.author.userId !== getConnectedUserId()) {
        throw createUnauthorizedError();
    }
    await api.delete(`${commentPath}/${commentId}`);
}