import { IParagraphInfoProps } from "./ParagraphInfo.props"
import React from "react"
import "./ParagraphInfo.css"
import { useGameStore } from "@store/useGameStore"
import { capitalizeFirstChar } from "@utils/StringConverter"

export const ParagraphInfo : React.FC<IParagraphInfoProps> = ({type}) => {
    const { game } = useGameStore()

    if(type === "result") {

        return (
            <>
                {
                    game?.name === 'euromillions' ?
                        <p className="paragraph">Ce tableau regroupe tous les tirages de l’EuroMillions depuis le passage à l'Euromillions - My Million (le 04/02/2014).</p>
                    : 
                        <p className="paragraph">Ce tableau regroupe tous les tirages du Loto depuis la mise en place du nouveau Loto (le 06/10/2008).</p>
                }
            </>
        )
    }

    if(type === "pronostic") {

        return (
            <p className="paragraph">Le tableau ci-dessous regroupe toutes les statistiques du jeu {game && capitalizeFirstChar(game.name)} relatives à chacun des <strong>{game?.maxNumber} numéros principaux</strong> (depuis {game?.name === 'euromillions' ? '04/02/2014' : '06/10/2008'}), ainsi que des <strong>{game?.maxBonus} numéros bonus</strong> {game?.name === 'euromillions' ? '(depuis l’instauration des 12 étoiles le 27/09/2016)' : ''}</p>
        )
    }
}