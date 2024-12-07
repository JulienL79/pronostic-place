import { useParams } from "react-router-dom";
import '../css/DescriptionGame.css';
import { useState } from "react";
import { useSelector } from "react-redux";

export function DescriptionGame() {
    const { game } = useSelector((state) => state.datas)

    return (
        <div className="page">
            { game === 'euromillions' ?
                <>
                    <h1>Qu'est-ce que l'EuroMillions ?</h1>
                    <p className="paragraph">
                        L'EuroMillions est une loterie transnationale européenne créée en 2004. Elle
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
                </>
                : game === 'loto' ?
                <>
                    <h1>Qu'est-ce que le Loto ?</h1>
                    <p className="paragraph">
                        Le Loto est un jeu de loterie très populaire en France, organisé par la Française
                        des Jeux. Les joueurs doivent choisir une combinaison de numéros parmi une grille
                        afin de tenter leur chance de remporter un jackpot ou d'autres gains. Le principe
                        est simple : plus votre sélection de numéros correspond à celle tirée au sort,
                        plus vous gagnez.
                    </p>
                    <p className="paragraph">
                        Lancé le 19 mai 1976, le Loto est devenu un pilier des jeux d'argent en France.
                        Son succès repose sur ses tirages réguliers, ses gains attractifs et la simplicité
                        de ses règles. Le jeu a évolué au fil des années, avec l'ajout de nouvelles
                        fonctionnalités comme le « Numéro Chance » et les jackpots boostés.
                    </p>
                </>
                : <></>
            }
        </div>
    )
}