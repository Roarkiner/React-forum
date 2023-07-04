import '../assets/style/home.css';
import '../assets/style/my-topics.css';

import { Link } from 'react-router-dom';
import { getConnectedUserId } from '../services/AuthService';
import { getAllTopics } from '../services/TopicService';
import TopicCardSkeleton from '../shared/TopicCardSkeleton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import TopicCardWithDelete from '../shared/TopicCardWithDelete';
import { useState } from 'react';
import SearchBar from '../shared/SearchBar';

const MyTopics: React.FC = () => {
    const queryClient = useQueryClient();
    const [searchValue, setSearchValue] = useState("");
    const myTopicsQuery = useQuery(["myTopics", searchValue], getAllTopicsForCurrentUser);

    async function getAllTopicsForCurrentUser(): Promise<TopicListItem[]> {
        const userId = getConnectedUserId();
        return await getAllTopics(searchValue, 1, userId);
    }

    function refreshTopicList(): void {
        queryClient.invalidateQueries({ queryKey: ["myTopics"] });
    }

    if (myTopicsQuery.isLoading) {
        return (
            <>
                <h1>Mes sujets</h1>
                <div className="btn btn-primary mb-3">
                    <i className="bi bi-plus-circle h4 m-0 mx-2"></i>
                    <span className="h4">Créer un sujet</span>
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

    if (myTopicsQuery.data!.length == 0 && searchValue.length === 0) {
        return (
            <>
                <h1>Mes sujets</h1>
                <div className="add-button mb-3">
                    <Link to="/add-topic" className="btn btn-primary">
                        <i className="bi bi-plus-circle h4 m-0 mx-2"></i>
                        <span className="h4">Créer un sujet</span>
                    </Link>
                </div>
                <h4>Vous n'avez pas encore de sujets !</h4>
            </>
        )
    }

    if (myTopicsQuery.data!.length == 0 && searchValue.length !== 0) {
        return (
            <>
                <h1>Mes sujets</h1>
                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} isLoading={myTopicsQuery.isLoading} />
                <div className="add-button mb-3">
                    <Link to="/add-topic" className="btn btn-primary">
                        <i className="bi bi-plus-circle h4 m-0 mx-2"></i>
                        <span className="h4">Créer un sujet</span>
                    </Link>
                </div>
                <h4>Aucun sujet ne correspond à votre recherche.</h4>
            </>
        )
    }

    return (
        <>
            <h1>Mes sujets</h1>
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} isLoading={myTopicsQuery.isLoading} />
            <div className="add-button">
                <Link to="/add-topic" className="btn btn-primary">
                    <i className="bi bi-plus-circle h4 m-0 mx-2"></i>
                    <span className="h4">Créer un sujet</span>
                </Link>
            </div>
            <div className="topic-card-list">
                {myTopicsQuery.data!.map((t) => (<TopicCardWithDelete isLoading={myTopicsQuery.isLoading} deleteCallback={refreshTopicList} key={t.topicId} topic={t} />))}
            </div>
        </>
    )
}

export default MyTopics;