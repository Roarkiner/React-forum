import "../assets/style/topic-detail.css";

import { useParams } from "react-router-dom";
import { getTopic } from "../services/TopicService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteComment, getCommentsForTopicId, saveComment } from "../services/CommentService";
import TopicDetailCardSkeleton from "../shared/TopicDetailCardSkeleton";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { CommentSaveModel } from "../models/CommentSaveModel";
import { getConnectedUserIRI, getConnectedUserId } from "../services/AuthService";
import CommentCardWithDelete from "../shared/CommentCardWithDelete";
import CommentCard from "../shared/CommentCard";

const TopicDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const topicQuery = useQuery(["topic"], getCurrentTopic);
    const commentsQuery = useQuery(["comments"], getCommentsForTopic);
    const [isNewCommentVisible, setIsNewCommentVisible] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [commentContentError, setCommentContentError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const handleCommentContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (commentContentError !== "") {
            if (commentContent.trim() !== "") {
                setCommentContentError("");
            }
        }
        setCommentContent(e.target.value);
    };

    async function getCurrentTopic() {
        return getTopic(Number(id));
    }

    async function getCommentsForTopic() {
        return getCommentsForTopicId(Number(id));
    }

    function toggleIsNewCommentVisible() {
        setIsNewCommentVisible(!isNewCommentVisible);
    }

    function closeNewComment() {
        setCommentContent("");
        toggleIsNewCommentVisible();
    }

    async function handleCommentDelete() {
        queryClient.invalidateQueries({ queryKey: ["comments"] });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (commentContent.trim() === "") {
            setCommentContentError("Veuillez écrire un commentaire.");
            setIsLoading(false);
            return;
        }

        try {
            const result = await saveComment(new CommentSaveModel(
                commentContent,
                getConnectedUserIRI(),
                topicQuery.data!.topicIRI
            ));
            if (!result) {
                toast.error("Un problème est survenu, veuillez rafraichir la page.", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false
                });
            } else {
                queryClient.invalidateQueries({ queryKey: ["comments"] });
                closeNewComment();
            }
        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false
                });
            }
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
                        {commentContentError && <p className="error">{commentContentError}</p>}
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
            {commentsQuery.data!.length !== 0 ?
                <div className="mt-3">
                    {commentsQuery.data!.map((comment) => (
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
                :
                <h4 className="mt-3">Aucun commentaire pour l'instant</h4>
            }
        </div>
    )
}

export default TopicDetail;