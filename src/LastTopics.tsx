import './assets/style/last-topics.css'
import { useEffect, useState } from "react";

const LastTopics = () => { 
    const [topics, setTopics] = useState<Topic[]>([]);

    useEffect(() => {
        fetch("https://ynov-topics-comments.ld-web.net/api/topics").then((response) => {
            return response.json();
        }).then((data) => {
            const topicResponse: Topic[] = data["hydra:member"].map((t: any) => {
                return { 
                    topicId: t.id,
                    title: t.name,
                    creation_date: t.createdAt
                }
            });

            setTopics(topicResponse);
        })
    }, []);

    return (
    <>
        <h1>Les dernières discussions</h1>
        <div className="last-topics">
            { topics.map((t) => (
                <div className="topics-block" key={t.topicId}>
                    <div className="topics-title">{ t.title }</div>
                    <div className="topics-content">{  }</div>
                </div>
            )) }
        </div>
    </>
    )
}

export default LastTopics;