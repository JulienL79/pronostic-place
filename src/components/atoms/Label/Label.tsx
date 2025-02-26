import React from "react";
import { ILabelProps } from "./Label.props";
import "./Label.css"

export const Label : React.FC<ILabelProps> = ({
    htmlFor,
    children,
    className = ""
}) => {
    return(
        <label htmlFor={htmlFor} className={className}>
            {children}
        </label>
    )
}