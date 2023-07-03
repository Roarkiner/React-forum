const TopicDetailCardSkeleton = () => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                </p>
            </div>
            <div className="card-footer">
                <div className="d-flex justify-content-between">
                    <span className="placeholder col-1"></span>
                    <span className="placeholder col-1"></span>
                </div>
            </div>
        </div>
    )
}

export default TopicDetailCardSkeleton;