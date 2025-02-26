import React from "react"
import { INumberProps } from "./Number.props"
import "./Number.css"
import { useGameStore } from "@store/useGameStore"


export const Number : React.FC<INumberProps> = ({
    data,
    type,
    className
}) => {
    const { game } = useGameStore()

    if(type === "number") {
        return (
            <div className={`ball ${game && game.name === "euromillions" ? "euromillions" : "loto"} ${className || ""}`}>{data}</div>
        )
    }

    if(type === "bonus") {
        return (
            <div className={`ball ${game && game.name === "euromillions" ? "euromillions-bonus" : "loto-bonus"} ${className || ""}`}>{data}</div>
        )
    }
}