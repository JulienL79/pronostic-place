import React from "react";
import { Link } from "react-router-dom";
import { INavItemProps } from "./NavItem.props";
import { useNavigate } from "react-router-dom";
import "./NavItem.css"

export const NavItem : React.FC<INavItemProps> = ({
    to,
    content,
    className = "",
    onClick
}) => {
    const navigate = useNavigate()

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault(); // Empêcher la navigation
            onClick(content as string); // Appeler la fonction onClick avec le contenu
        }
        navigate(to)
    };


    if(onClick === undefined) {
        return (
            <Link to={to} className={`${className}`}>
                {content}
            </Link>
        )
    }

    return (
        <Link to={to} className={`${className}`} onClick={handleClick}>
            {content}
        </Link>
    )
}