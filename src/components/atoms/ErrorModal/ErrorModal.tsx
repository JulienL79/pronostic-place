import { useEffect, useState } from "react";
import { IErrorModal } from "./ErrorModal.props";
import { Button } from "@atoms/Button";
import React from "react";
import "./ErrorModal.css"

export const ErrorModal : React.FC<IErrorModal> = ({ message, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300)
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 100); // Supprime la modale après l'animation
    };

    return (
        <div className={`error-modal ${visible ? "show" : "hide"}`}>
            <span>{message}</span>
            <Button className="close-btn" content="✖" onClick={() => handleClose()}/>
        </div>
    );
};
