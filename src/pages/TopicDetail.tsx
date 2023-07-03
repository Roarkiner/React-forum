import "../assets/style/topic-detail.css";

import { useParams } from "react-router-dom";
import { getTopic } from "../services/TopicService";
import { useQuery } from "@tanstack/react-query";
import { getCommentsForTopicId } from "../services/CommentService";
import TopicDetailCardSkeleton from "../shared/TopicDetailCardSkeleton";

const TopicDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const topicQuery = useQuery(["topic"], getCurrentTopic);
    const commentsQuery = useQuery(["comments"], getCommentsForTopic)

    async function getCurrentTopic() {
        return getTopic(Number(id));
    }

    async function getCommentsForTopic() {
        return getCommentsForTopicId(Number(id));
    }

    if (topicQuery.isLoading || commentsQuery.isLoading) {
        return (
            <div className="topic-detail placeholder-glow">
                <div className="topic-header p-3 border-bottom border-black mb-3">
                    <h1><span className="placeholder col-8"></span></h1>
                    <p className="card-text">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                    <div className="d-flex justify-content-between border-top border-black pt-3">
                        <span className="placeholder col-1"></span>
                        <span className="placeholder col-1"></span>
                    </div>
                </div>
                <div>
                    <TopicDetailCardSkeleton />
                    <TopicDetailCardSkeleton />
                    <TopicDetailCardSkeleton />
                </div>
            </div>
        )
    }

    return (
        <div className="topic-detail">
            <div className="topic-header p-3 border-bottom border-black mb-3">
                <h1>{topicQuery.data!.title}</h1>
                <p>{topicQuery.data!.description}</p>
                <div className="d-flex justify-content-between border-top border-black pt-3">
                    <span>Sujet posté par {topicQuery.data!.author.username}</span>
                    <span>{topicQuery.data!.creation_date}</span>
                </div>
            </div>
            {commentsQuery.data!.map((comment) => (
                <div key={comment.commentId} className="card">
                    <div className="card-body">
                        <p className="card-text">{comment.content}</p>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-between">
                            <span>{comment.author.username}</span>
                            <span className="fst-italic">{comment.creation_date}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TopicDetail;