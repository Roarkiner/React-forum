import React, { useState, ChangeEvent, FormEvent } from "react";
import "../assets/style/new-topic.css"
import { saveTopic } from "../services/TopicService";
import { TopicSaveModel } from "../models/TopicSaveModel";
import { askUserForConnection, getConnectedUserIRI } from "../services/AuthService";
import { useNavigate } from 'react-router-dom';
import { displayDefaultToastError } from "../services/ToastHelper";

const NewTopic: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (titleError !== "") {
            if (title.trim() !== "") {
                setTitleError("");
            }
        }
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (descriptionError !== "") {
            if (description.trim() !== "") {
                setDescriptionError("");
            }
        }
        setDescription(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (title.trim() === "")
            setTitleError("Veuillez entrer un titre.");

        if (description.trim() === "")
            setDescriptionError("Veuillez entrer une description.");

        if (titleError !== "" || descriptionError !== "") {
            setIsLoading(false);
            return;
        }

        const userIRI = getConnectedUserIRI();

        if (userIRI === null) {
            askUserForConnection();
            return;
        }

        try {
            const savedTopic = await saveTopic(new TopicSaveModel(
                title,
                description,
                userIRI
            ));
            navigate(`/topic-detail/${savedTopic.topicId}`, { replace: true })
        } catch (error) {
            displayDefaultToastError()
            throw error;
        }
        
        setIsLoading(false);
    };

    return (
        <div className="new-topic-page">
            <h1>Créer un nouveau sujet</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Titre</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        className="form-control"
                    />
                    {titleError && <p className="error">{titleError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        className="form-control"
                    />
                    {descriptionError && <p className="error">{descriptionError}</p>}
                </div>
                <button disabled={isLoading} type="submit">Créer le sujet</button>
            </form>
        </div>
    );
};

export default NewTopic;