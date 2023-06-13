interface User {
    userId: number,
    email: string,
    password: string,
    pseudonym: string,
}

interface Topic {
    topicId: number,
    title: string,
    creation_date: string
}

interface TopicComment {
    commentId: number,
    userId: number,
    topicId: number,
    content: string
    creation_date: Date,
    last_edited_date: Date,
}