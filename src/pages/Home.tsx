import { Link } from 'react-router-dom';
import '../assets/style/home.css'

import { getAllTopics } from '../services/TopicService';
import TopicCard from '../shared/TopicCard';
import TopicCardSkeleton from '../shared/TopicCardSkeleton';
import { useQuery } from '@tanstack/react-query';

const Home: React.FC = () => {
    const query = useQuery(["topics"], getAllTopics);

    if (query.isLoading) {
        return (
            <>
                <h1>Les derniers sujets</h1>
                <div className="add-button">
                <div className="btn btn-primary">
                    <i className="bi bi-plus-circle h4 m-0 mx-2"></i>
                    <span className="h4">Créer un nouveau sujet</span>
                </div>
                </div>
                <div className="topic-card-list">
                    <TopicCardSkeleton />
                    <TopicCardSkeleton />
                    <TopicCardSkeleton />
                    <TopicCardSkeleton />
                    <TopicCardSkeleton />
                </div>
            </>
        )
    }

    return (
        <>
            <h1>Les derniers sujets</h1>
            <div className="add-button">
                <Link to="/add-topic" className="btn btn-primary">
                    <i className="bi bi-plus-circle h4 m-0 mx-2"></i>
                    <span className="h4">Créer un nouveau sujet</span>
                </Link>
            </div>
            <div className="topic-card-list">
                {query.data!.map((t) => (<TopicCard key={t.topicId} topic={t} />))}
            </div>
        </>
    )
}

export default Home;