import { TOPICS } from "./data/topics";
import { TOPIC_COMMENTS } from "./data/topic_comments";
import './assets/style/last-topics.css'

const LastTopics = () => (
    <>
        <h1>Les dernières discussions</h1>
        <div className="last-topics">
            { TOPICS.map((t) => (
                <div className="topics-block">
                    <div className="topics-title">{ t.title }</div>
                    <div className="topics-content">{  }</div>
                </div>
            )) }
        </div>
    </>
);

export default LastTopics;