import React from "react";
import { INavbarProps } from "./Navbar.props";
import { NavItem } from "@atoms/NavItem";
import { useGameStore } from "@store/useGameStore";
import { Image } from "@atoms/Image";
import Logo from '/icon.png'
import { minimalizeString } from "@utils/StringConverter";
import { getGameSettings } from "@utils/getGameSettings";
import "./Navbar.css"

export const Navbar : React.FC<INavbarProps> = ({ 
    navLinks,
}) => {

    const { game, isGameChoosen, setGame } = useGameStore();

    const handleNewGame = async (newGame: string) => {
        const newGameUpdated = minimalizeString(newGame)
        
        const changeGame = () => {
            const gameSettings = getGameSettings(newGameUpdated)
            setGame(gameSettings)
        }

        if(game && game.name !== newGameUpdated) {
            changeGame()
        }

        if(!game) {
            changeGame()
        }
    };

    return (
        <header>
            <div className="navbar">
                <NavItem to="/" content={<figure className="sphere logo-link"><span className="shadow"></span></figure>} className="no-link logo-link"/>
                {
                    isGameChoosen && game ?
                        <nav className='big-nav'>
                            <NavItem to={`/pronostic`} content={"Pronostics"}/>
                            <NavItem to={`/result`} content={"Résultats"}/>
                        </nav>
                        : null
                }

            </div>
            <nav className="sub-nav">
                {navLinks.map((link) => {
                    return <NavItem key={`${link.to}-${link.content}`} to={link.to} className={link.className ? game && minimalizeString(link.content as string) === game.name ? `${link.className} selected` : link.className : ""} content={link.content} onClick={handleNewGame}/>
                })}
            </nav>
        </header>
    )

}