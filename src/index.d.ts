interface User {
    id: number,
    name: string,
    firstName: string
}

interface Topic {
    id: number,
    title: string,
    last_edited_date: Date,
    description: string
}

interface Post {
    id: number,
    topicId: number,
    creation_date: Date,
    content: string
}