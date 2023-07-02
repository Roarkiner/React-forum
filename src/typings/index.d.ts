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

interface TopicDetail {
    topicId: number,
    title: string,
    description: string,
    creation_date: string,
    author: LightUser,
    comments: Comment[]
}

interface Comment {
    commentId: number,
    content: string
    creation_date: Date,
    author: LightUser
}