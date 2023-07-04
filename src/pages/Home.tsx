import { Link } from 'react-router-dom';
import '../assets/style/home.css'

import TopicCard from '../shared/TopicCard';
import TopicCardSkeleton from '../shared/TopicCardSkeleton';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../shared/SearchBar';
import { useState } from 'react';
import { getAllTopics } from '../services/TopicService';
import Pagination from '../shared/Pagination';

const Home: React.FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const topicsQuery = useQuery(["topics", searchValue, currentPage], getAllTopicsBySearchValue);

    async function getAllTopicsBySearchValue(): Promise<GetAllTopicResponse> {
        return await getAllTopics(searchValue, currentPage);
    }

    if (topicsQuery.isLoading) {
        return (
            <>
                <h1>Les derniers sujets</h1>
                <div className="add-button mb-3">
                    <div className="btn btn-primary">
                        <i className="bi bi-plus-circle h4 m-0 mx-2"></i>
                        <span className="h4">Créer un sujet</span>
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

    if (topicsQuery.data!.topicListItems.length === 0 && searchValue.length !== 0) {
        return (
            <>
                <h1>Les derniers sujets</h1>
                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} isLoading={topicsQuery.isLoading} />
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
            <h1>Les derniers sujets</h1>
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} isLoading={topicsQuery.isLoading} />
            <div className="add-button mb-3">
                <Link to="/add-topic" className="btn btn-primary">
                    <i className="bi bi-plus-circle h4 m-0 mx-2"></i>
                    <span className="h4">Créer un sujet</span>
                </Link>
            </div>
            <div className="topic-card-list">
                {topicsQuery.data!.topicListItems.map((t) => (<TopicCard key={t.topicId} topic={t} />))}
            </div>
            <div className="d-flex justify-content-center mt-3 p-3 border-top">
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={30}
                    numberOfItems={topicsQuery.data!.numberOfItems} />
            </div>
        </>
    )
}

export default Home;