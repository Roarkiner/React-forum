import { Link } from 'react-router-dom';
import '../assets/style/home.css'
import { getConnectedUserId } from '../services/AuthService';

import { getAllTopicsForUser } from '../services/TopicService';
import TopicCard from '../shared/TopicCard';
import TopicCardSkeleton from '../shared/TopicCardSkeleton';
import { useQuery } from '@tanstack/react-query';

const MyTopics: React.FC = () => {
    const query = useQuery(["topics"], getAllTopicsForCurrentUser);

    async function getAllTopicsForCurrentUser(): Promise<TopicListItem[]> {
        const userId = getConnectedUserId();
        return getAllTopicsForUser(userId);
    }

    if( query.isLoading ){
        return (
        <>    
            <h1>Mes sujets</h1>
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

    if( query.data!.length == 0 ){
        return (
            <>
                <h2>Vous n'avez pas encore de sujets !</h2>
                <div className="add-button">
                    <Link to="/add-topic" className="btn btn-primary">
                        <i className="bi bi-plus-circle h4 m-0 mx-2"></i>
                        <span className="h4">Créer un nouveau sujet</span>
                    </Link>
                </div>
            </>
        )
    }

    return (
    <>
        <h1>Mes sujets</h1>
        <div className="add-button">
            <Link to="/add-topic" className="btn btn-primary">
                <i className="bi bi-plus-circle h4 m-0 mx-2"></i>
                <span className="h4">Créer un nouveau sujet</span>
            </Link>
        </div>
        <div className="topic-card-list">
            { query.data!.map((t) => (<TopicCard key={t.topicId} topic={t} />)) }
        </div>
    </>
    )
}

export default MyTopics;