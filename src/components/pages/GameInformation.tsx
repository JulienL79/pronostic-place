import { useGameStore } from "@store/useGameStore"
import { Helmet } from "react-helmet"

export const GameInformation = () => {
    const { game } = useGameStore()


    if (game && game.name === "euromillions") {
        return (
            <>
                <Helmet>
                    <title>Euromillions</title>
                </Helmet>
                <div className="page">
                    <h1>Qu'est-ce que l'EuroMillions ?</h1>
                    <p className="paragraph">
                        L' <strong>EuroMillions</strong> est une loterie transnationale européenne créée en 2004. Elle
                        permet aux joueurs de plusieurs pays d'Europe de tenter leur chance pour remporter
                        des <em>jackpots colossaux</em>. Les participants choisissent <strong>cinq numéros principaux
                            ainsi que deux « étoiles chance »</strong> pour tenter de décrocher le gros lot.
                    </p>
                    <p className="paragraph">
                        Le premier tirage de l'EuroMillions a eu lieu le <strong>13 février 2004</strong>. Initialement,
                        seuls trois pays participaient : la France, l'Espagne et le Royaume-Uni.
                        Rapidement, d'autres pays européens se sont joints à cette loterie, qui est
                        désormais l'une des plus populaires au monde.
                    </p>
                </div>
            </>
        )
    }

    if (game && game.name === "loto") {
        return (
            <>
                <Helmet>
                    <title>Loto</title>
                </Helmet>
                <div className="page">
                    <h1>Qu'est-ce que le Loto ?</h1>
                    <p className="paragraph">
                        Le <strong>Loto</strong> est un jeu de loterie très populaire en France, organisé par la Française
                        des Jeux. Les joueurs doivent choisir une combinaison de numéros parmi une grille de <strong>cinq numéros principaux</strong> et d'<strong>un numéro chance </strong>
                        afin de tenter leur chance de remporter un jackpot ou d'autres gains. Le principe
                        est simple : plus votre sélection de numéros correspond à celle tirée au sort,
                        plus vous gagnez.
                    </p>
                    <p className="paragraph">
                        Lancé le <strong>19 mai 1976</strong>, le Loto est devenu un pilier des jeux d'argent en France.
                        Son succès repose sur ses <em>tirages réguliers</em>, ses gains attractifs et la simplicité
                        de ses règles. Le jeu a évolué au fil des années, avec l'ajout de nouvelles
                        fonctionnalités comme le <em>« Numéro Chance »</em> et les <em>jackpots boostés</em>.
                    </p>
                </div>
            </>
        )
    }
}