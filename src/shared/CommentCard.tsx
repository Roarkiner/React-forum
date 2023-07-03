const CommentCard: React.FC<{ comment: CommentListItem }> = ({ comment }) => {
    return (
        <div className="d-flex">
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
        </div>
    )
}

export default CommentCard;