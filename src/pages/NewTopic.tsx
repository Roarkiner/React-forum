import React, { useState, ChangeEvent, FormEvent } from "react";
import "../assets/style/new-topic.css"
import { saveTopic } from "../services/TopicService";
import { TopicSaveModel } from "../models/TopicSaveModel";
import { askUserForConnection, getConnectedUserIRI } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { displayDefaultToastError } from "../services/ToastHelper";

const NewTopic: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function validateTitle(): boolean {
        return title.trim() !== "";
    }

    function validateDescription(): boolean {
        return description.trim() !== "";
    }

    function validateInputsThenSetErrors(): boolean {
        const isTitleValid = validateTitle();
        const isDescriptionValid = validateDescription();

        setTitleError(!isTitleValid);
        setDescriptionError(!isDescriptionValid);

        return isTitleValid && isDescriptionValid;
    }

    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        if(inputValue.trim() !== "") {
            setTitleError(false);
        }
        setTitle(inputValue);
    };

    function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const inputValue = e.target.value;
        if(inputValue.trim() !== "") {
            setDescriptionError(false);
        }
        setDescription(inputValue);
    };

    function handleTitleBlur() {
        setTitleError(!validateTitle());
    }

    function handleDescriptionBlur() {
        setDescriptionError(!validateDescription());
    }


    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        if (!validateInputsThenSetErrors()) {
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
                        onBlur={handleTitleBlur}
                        className="form-control"
                    />
                    {titleError && <p className="error">Veuillez entrer un titre</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        onBlur={handleDescriptionBlur}
                        className="form-control"
                    />
                    {descriptionError && <p className="error">Veuillez entrer une description.</p>}
                </div>
                <button disabled={isLoading} type="submit">Créer le sujet</button>
            </form>
        </div>
    );
};

export default NewTopic;