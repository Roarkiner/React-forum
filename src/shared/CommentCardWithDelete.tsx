import { toast } from "react-toastify";
import { deleteComment } from "../services/CommentService";
import CommentCard from "./CommentCard";

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
        <div className="d-flex align-items-center">
            <CommentCard comment={comment} />
            <button disabled={isLoading} className="btn btn-danger ms-3" onClick={handleCommentDelete}>
                <i className="bi bi-trash"></i>
            </button>
        </div>
    )
}

export default CommentCardWithDelete;