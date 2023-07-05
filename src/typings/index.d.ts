interface UserListItem {
    userId: number,
    email: string
}

interface LightUser {
    userId: number,
    email: string,
    username: string
}

interface TopicListItem {
    topicId: number,
    title: string,
    description: string,
    creation_date: string,
    author: LightUser,
    commentsCount: number
}

interface GetAllTopicResponse {
    topicListItems: TopicListItem[],
    numberOfItems: number
}

interface GetAllComments {
    commentListItems: CommentListItem[],
    numberOfItems: number
}

interface TopicDetail {
    topicIRI: string,
    topicId: number,
    title: string,
    description: string,
    creation_date: string,
    author: LightUser,
}

interface CommentListItem {
    commentId: number,
    content: string
    creation_date: string,
    author: LightUser
}

class AlreadyUsedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AlreadyUsedError";
    }
}