import { Link } from "react-router-dom";

const TopicCard: React.FC<{ topic: TopicListItem }> = ({ topic }) => {

    return (
        <Link to={`/topic-detail/${topic.topicId}`}>
        <div className="topic-card card">
            <div className="card-header">
                <h5 className="card-title title-overflow">{ topic.title }</h5>
            </div>
            <div className="card-body paragraph-overflow">
                <p className="card-text">{ topic.description }</p>
                <span className="comments-count">{ topic.commentsCount } commentaires</span>
            </div>
            <div className="card-footer">
                <div className="d-flex justify-content-between">
                    <span>{ topic.author.username }</span>
                    <span className="fst-italic">{ topic.creation_date }</span>
                </div>
            </div>
        </div>
        </Link>
        )
    }
    
    export default TopicCard;
