import '../assets/style/home.css'

const TopicCardSkeleton = () => { 
    return (
    <>
        <div className="topic-card card" aria-hidden="true">
            <div className="card-header">
                <h5 className="card-title">
                    <span className="placeholder col-6"></span>
                </h5>
            </div>
            <div className="card-body">
            <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
            </p>
            </div>
            <div className="card-footer">
                <div className="d-flex justify-content-between">
                <span className="placeholder col-3"></span>
                <span className="placeholder col-4"></span>
                </div>
            </div>
        </div>
    </>
    )
}

export default TopicCardSkeleton;