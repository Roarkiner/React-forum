import { toast } from "react-toastify";
import { deleteComment } from "../services/CommentService";

interface CommentCardWithDeleteProps {
    comment: CommentListItem,
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
    onDelete: () => void
}

const CommentCardWithDelete: React.FC<CommentCardWithDeleteProps> = ({ comment, isLoading, setIsLoading, onDelete }) => {
    async function handleCommentDelete() {
        setIsLoading(true);
        const result = await deleteComment(comment.commentId);
        if (result) {
            onDelete();
        } else {
            toast.error("Un problème est survenu, veuillez rafraichir la page.", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            });
        }
        setIsLoading(false);
    }

    return (
        <div className="d-flex align-items-center mb-3">
            <div className="card">
                <div className="card-body">
                    <p className="card-text">{comment.content}</p>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-between">
                        <span>{comment.author.username}</span>
                        <span className="fst-italic">{comment.creation_date}</span>
                    </div>
                </div>
            </div>
            <button disabled={isLoading} className="btn btn-danger ms-3" onClick={handleCommentDelete}>
                <i className="bi bi-trash"></i>
            </button>
        </div>
    )
}

export default CommentCardWithDelete;