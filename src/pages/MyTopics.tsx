import "../assets/style/home.css";

import { Link } from "react-router-dom";
import { askUserForConnection, getConnectedUserId } from "../services/AuthService";
import { getAllTopics } from "../services/TopicService";
import TopicCardSkeleton from "../shared/TopicCardSkeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TopicCardWithDelete from "../shared/TopicCardWithDelete";
import { useState } from "react";
import SearchBar from "../shared/SearchBar";
import Pagination from "../shared/Pagination";
import { displayDefaultToastError } from "../services/ToastHelper";

const MyTopics: React.FC = () => {
    const queryClient = useQueryClient();
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const myTopicsQuery = useQuery(["myTopics", searchValue, currentPage], getAllTopicsForCurrentUser);

    async function getAllTopicsForCurrentUser(): Promise<GetAllTopicResponse> {
        try {
            const userId = getConnectedUserId();
            if (userId === null) {
                askUserForConnection();
            }
            return await getAllTopics(searchValue, currentPage, userId!);
        } catch (error) {
            displayDefaultToastError();
            throw error;
        }
    }

    function refreshTopicList(): void {
        queryClient.invalidateQueries({ queryKey: ["myTopics"] });
        setCurrentPage(1);
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

    if (myTopicsQuery.data!.topicListItems.length == 0 && searchValue.length === 0) {
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

    if (myTopicsQuery.data!.topicListItems.length == 0 && searchValue.length !== 0) {
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

    if (myTopicsQuery.isError) {
        return (
            <div className="topic-detail">
                <h1>Impossible de charger les sujets.</h1>
            </div>
        );
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
                {myTopicsQuery.data.topicListItems.map((t) => (<TopicCardWithDelete isLoading={myTopicsQuery.isLoading} deleteCallback={refreshTopicList} key={t.topicId} topic={t} />))}
            </div>
            <div className="d-flex justify-content-center mt-3 p-3 border-top">
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={30}
                    numberOfItems={myTopicsQuery.data.numberOfItems} />
            </div>
        </>
    )
}

export default MyTopics;