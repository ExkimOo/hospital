import React, {useState} from "react";
import {useAuth} from "../hook/useAuth";
import '../styles/Form.css';
const DeleteForm = ({id, cb}) => {
    const {client} = useAuth();

     const submitDelete = (e) => {
        e.preventDefault();
        client.delete(`/api/schedule/${id}/`);
        setTimeout(cb, 100);
    };

    return (
        <form onSubmit={submitDelete}>
            <input
                type="text"
                value={id}
                className="form-input"
                readOnly={true}
            />
            <button type="submit" className="form-button">
                Delete
            </button>
        </form>
    )
}

export default DeleteForm;