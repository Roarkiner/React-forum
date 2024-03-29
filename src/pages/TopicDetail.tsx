import "../assets/style/topic-detail.css";

import { useParams } from "react-router-dom";
import { getTopic } from "../services/TopicService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommentsForTopicId, saveComment } from "../services/CommentService";
import TopicDetailCardSkeleton from "../shared/TopicDetailCardSkeleton";
import { ChangeEvent, FormEvent, useState } from "react";
import { CommentSaveModel } from "../models/CommentSaveModel";
import { askUserForConnection, getConnectedUserIRI, getConnectedUserId } from "../services/AuthService";
import CommentCardWithDelete from "../shared/CommentCardWithDelete";
import CommentCard from "../shared/CommentCard";
import { displayDefaultToastError } from "../services/ToastHelper";
import Pagination from "../shared/Pagination";

const TopicDetail: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [isNewCommentVisible, setIsNewCommentVisible] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [commentContentError, setCommentContentError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const commentsQuery = useQuery(["comments", currentPage], getCommentsForTopic);
    const topicQuery = useQuery(["topic"], getCurrentTopic);

    function handleCommentContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const inputValue = e.target.value;
        if (inputValue.trim() !== "") {
            setCommentContentError(false);
        }
        setCommentContent(e.target.value);
    };

    async function getCurrentTopic() {
        try {
            return getTopic(Number(id));
        } catch (error) {
            displayDefaultToastError();
            throw error;
        }
    }

    async function getCommentsForTopic() {
        try {
            return getCommentsForTopicId(Number(id), currentPage);
        } catch (error) {
            displayDefaultToastError();
            throw error;
        }
    }

    function toggleIsNewCommentVisible() {
        if (!isNewCommentVisible && !isAuthenticated) {
            askUserForConnection(false, window.location.pathname);
        } else {
            setIsNewCommentVisible(!isNewCommentVisible);
        }
    }

    function closeNewComment() {
        setCommentContent("");
        toggleIsNewCommentVisible();
    }

    async function handleCommentDelete() {
        queryClient.invalidateQueries({ queryKey: ["comments"] });
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        if (commentContent.trim() === "") {
            setCommentContentError(true);
            setIsLoading(false);
            return;
        }

        const userIRI = getConnectedUserIRI();

        if (userIRI === null) {
            askUserForConnection();
            return;
        }

        try {
            await saveComment(new CommentSaveModel(
                commentContent,
                userIRI,
                topicQuery.data!.topicIRI
            ));
            queryClient.invalidateQueries({ queryKey: ["comments"] });
            closeNewComment();
        } catch (error) {
            displayDefaultToastError();
            throw error;
        }

        setIsLoading(false);
    };

    if (topicQuery.isLoading || commentsQuery.isLoading) {
        return (
            <div className="topic-detail placeholder-glow">
                <div className="topic-header p-3 border-bottom border-black mb-3">
                    <h1><span className="placeholder col-8"></span></h1>
                    <p className="card-text">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                    <div className="d-flex justify-content-between border-top border-black pt-3">
                        <span className="placeholder col-1"></span>
                        <span className="placeholder col-1"></span>
                    </div>
                </div>
                <div>
                    <TopicDetailCardSkeleton />
                    <TopicDetailCardSkeleton />
                    <TopicDetailCardSkeleton />
                </div>
            </div>
        )
    }

    if (topicQuery.isError || commentsQuery.isError) {
        return (
            <div className="topic-detail">
                <h1>Impossible de charger le sujet et ses commentaires.</h1>
            </div>
        );
    }

    return (
        <div className="topic-detail">
            <div className="topic-header p-3 border-bottom border-black mb-3">
                <h1>{topicQuery.data!.title}</h1>
                <p>{topicQuery.data!.description}</p>
                <div className="d-flex justify-content-between border-top border-black pt-3">
                    <span>Sujet posté par {topicQuery.data!.author.username}</span>
                    <span>{topicQuery.data!.creation_date}</span>
                </div>
            </div>
            {isNewCommentVisible ?
                <>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="commentContent">Ajouter un commentaire</label>
                        <textarea
                            id="commentContent"
                            value={commentContent}
                            onChange={handleCommentContentChange}
                            className="form-control mb-2"
                        />
                        {commentContentError && <p className="error">Veuillez écrire un commentaire.</p>}
                        <div className="new-comment-buttons d-flex justify-content-end">
                            <button disabled={isLoading} className="btn btn-danger me-3" onClick={closeNewComment}>Annuler</button>
                            <button disabled={isLoading} className="btn btn-success" type="submit">Envoyer</button>
                        </div>
                    </form>
                </>
                :
                <button onClick={toggleIsNewCommentVisible} className="btn btn-secondary">
                    <i className="bi bi-chat-left me-3"></i>
                    <span>Ajouter un commentaire...</span>
                </button>
            }
            {commentsQuery.data.commentListItems.length !== 0 ?
                <div className="mt-3">
                    <div>
                        {commentsQuery.data.commentListItems.map((comment) => (
                            <div key={comment.commentId}>
                                {comment.author.userId == getConnectedUserId() ?
                                    <CommentCardWithDelete
                                        comment={comment}
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                        onDelete={handleCommentDelete}
                                    />
                                    :
                                    <CommentCard comment={comment} />
                                }
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-center mt-3 p-3 border-top">
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            itemsPerPage={30}
                            numberOfItems={commentsQuery.data.numberOfItems} />
                    </div>
                </div>
                :
                <h4 className="mt-3">Aucun commentaire pour l'instant</h4>
            }
        </div>
    )
}

export default TopicDetail;