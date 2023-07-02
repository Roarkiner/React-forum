import React, { useState, ChangeEvent, FormEvent } from "react";
import "../assets/style/new-topic.css"
import { saveTopic } from "../services/TopicService";
import { TopicSaveModel } from "../models/TopicSaveModel";
import { getConnectedUserIRI } from "../services/AuthService";
import { useNavigate } from 'react-router-dom';

const NewTopic: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

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

        if (title.trim() === "")
            setTitleError("Veuillez entrer un titre.");

        if (description.trim() === "")
            setDescriptionError("Veuillez entrer une description.");

        if (titleError !== "" || descriptionError !== "")
            return;

        const createdTopicId = await saveTopic(new TopicSaveModel(
            title,
            description,
            getConnectedUserIRI()
        ));

        if(createdTopicId !== undefined){
            navigate(`/topic-detail/${createdTopicId}`, { replace: true })
        }
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
                <button type="submit">Créer le sujet</button>
            </form>
        </div>
    );
};

export default NewTopic;