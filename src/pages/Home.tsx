import '../assets/style/home.css'
import { disconnectUser } from '../services/AuthService';

import { getAllTopics } from '../services/TopicService';
import TopicCardSkeleton from '../shared/TopicCardSkeleton';
import { useQuery } from '@tanstack/react-query';

const Home: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const query = useQuery(["topics"], getAllTopics);
    const handleLogout = () => {
        disconnectUser();
        onLogout();
    };

    if( query.isLoading ){
        return (
        <>    
            <h1>Les dernières discussions</h1>
            <div className="last-topics">
                <TopicCardSkeleton />
                <TopicCardSkeleton />
                <TopicCardSkeleton />
                <TopicCardSkeleton />
                <TopicCardSkeleton />
            </div>
        </>
        )
    }

    return (
    <>
        <button onClick={handleLogout}>Logout</button>
        <h1>Les dernières sujets</h1>
        <div className="last-topics">
            { query.data!.map((t) => (
                <div className="topic-card card" key={t.topicId}>
                    <div className="card-header">
                        <h5 className="card-title title-overflow">{ t.title }</h5>
                    </div>
                    <div className="card-body paragraph-overflow">
                        <p className="card-text">{ t.description }</p>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-between">
                            <span>{ t.author.username }</span>
                            <span className="fst-italic">{ t.creation_date }</span>
                        </div>
                    </div>
                </div>
                ))
            }
        </div>
    </>
    )
}

export default Home;