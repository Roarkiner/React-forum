import { apiUrl } from "./ApiService";
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