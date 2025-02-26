import { IButtonProps } from "./Button.props";
import React from "react";
import "./Button.css"

export const Button : React.FC<IButtonProps> = ({className = "", content, onClick, isDisabled= false}) => {

    if(onClick === undefined) {
        return (
            <button className={className} type="submit" disabled={isDisabled}>{content}</button>
        )
    }

    return (
        <button className={className} onClick={() => onClick()} disabled={isDisabled}>{content}</button>
    )
}