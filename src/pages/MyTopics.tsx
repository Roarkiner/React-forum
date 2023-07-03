import '../assets/style/home.css';
import '../assets/style/my-topics.css';

import { Link } from 'react-router-dom';
import { getConnectedUserId } from '../services/AuthService';
import { getAllTopicsForUser } from '../services/TopicService';
import TopicCardSkeleton from '../shared/TopicCardSkeleton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import TopicCardWithDelete from '../shared/TopicCardWithDelete';
import { useState } from 'react';

const MyTopics: React.FC = () => {
    const query = useQuery(["myTopics"], getAllTopicsForCurrentUser);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    async function getAllTopicsForCurrentUser(): Promise<TopicListItem[]> {
        const userId = getConnectedUserId();
        return getAllTopicsForUser(userId);
    }

    function refreshTopicList(): void {
        queryClient.invalidateQueries({ queryKey: ["myTopics"] });
    }

    if (query.isLoading) {
        return (
            <>
                <h1>Mes sujets</h1>
                <div className="btn btn-primary">
                    <i className="bi bi-plus-circle h4 m-0 mx-2"></i>
                    <span className="h4">Créer un nouveau sujet</span>
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

    if (query.data!.length == 0) {
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
                {query.data!.map((t) => (<TopicCardWithDelete isLoading={isLoading} setIsLoading={setIsLoading} deleteCallback={refreshTopicList} key={t.topicId} topic={t} />))}
            </div>
        </>
    )
}

export default MyTopics;