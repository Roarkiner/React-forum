import TopicCard from "./TopicCard";
import { deleteTopic } from "../services/TopicService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface TopicCardWithDeleteProps {
    topic: TopicListItem,
    deleteCallback: () => void,
    isLoading: boolean,
    setIsLoading: (value: boolean) => void
}

const TopicCardWithDelete: React.FC<TopicCardWithDeleteProps> = ({ topic, deleteCallback, isLoading, setIsLoading }) => {

    async function handleTopicDelete() {
        setIsLoading(true);
        const result = await deleteTopic(topic.topicId);
        if (result)
            deleteCallback();
        else
            toast.error("Un problème est survenu, veuillez rafraichir la page.", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            });
        setIsLoading(false);
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
