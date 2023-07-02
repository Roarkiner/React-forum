import { useParams } from "react-router-dom";

const TopicDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <>
            <h1>{id}</h1>
        </>
    )
}

export default TopicDetail;