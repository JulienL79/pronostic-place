import { IInputProps } from "./Input.props";
import React from "react";
import "./Input.css"

export const Input: React.FC<IInputProps> = ({
    id,
    type,
    placeholder,
    className = "",
    value = "",
    required = false,
    min,
    step,
    onChange
}) => {

    if(step) {
        return (
            <input id={id} type={type} placeholder={placeholder} className={className} value={value} required={required} min={min} step={step} onChange={onChange}/>
        )
    }

    return (
        <input id={id} type={type} placeholder={placeholder} className={className} value={value} required={required} onChange={onChange}/>
    )
};