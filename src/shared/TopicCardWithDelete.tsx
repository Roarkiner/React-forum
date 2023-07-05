import TopicCard from "./TopicCard";
import { deleteTopic } from "../services/TopicService";
import 'react-toastify/dist/ReactToastify.css';
import { displayDefaultToastError } from "../services/ToastHelper";

interface TopicCardWithDeleteProps {
    topic: TopicListItem,
    deleteCallback: () => void,
    isLoading: boolean,
}

const TopicCardWithDelete: React.FC<TopicCardWithDeleteProps> = ({ topic, deleteCallback, isLoading }) => {

    async function handleTopicDelete() {
        try{
            await deleteTopic(topic.topicId);
            deleteCallback();
        } catch(error) {
            displayDefaultToastError();
            throw error;
        }
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <TopicCard topic={topic} />
            <button disabled={isLoading} className="btn btn-danger mt-2" onClick={handleTopicDelete}>
                <i className="bi bi-trash"></i>
            </button>
        </div>
    )
}

export default TopicCardWithDelete;
