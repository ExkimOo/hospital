import React from "react";
import cl from '../styles/Modal.css';

const Modal = ({children, visible, setVisible}) => {
    return (
        <div
            className={`modal ${visible ? 'active' : ''}`}
            onClick={() => setVisible(false)}
        >
            <div className='modalContent' onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;