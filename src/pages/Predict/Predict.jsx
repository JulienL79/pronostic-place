import { useSelector } from "react-redux";
import { calculatePredict } from "./calculatePredict";
import { useState } from "react";
import { calculateProbabilities } from "./calculateProbabilities";
import { TablePredict } from "./TablePredict";
import { getPredictSettings } from "./getPredictSettings";
import '../../css/Predict.css'

export function Predict() {
    const { datas, maxBonus, maxNumber, game, numberDraw, bonusDraw, firstFilterPredict, secondFilterPredict } = useSelector((state) => state.datas);
    const [orderBy, setOrderBy] = useState('decroissant');

    const capitalizedGame = game.charAt(0).toUpperCase() + game.slice(1);
    const tableSettings = getPredictSettings(game);

    const numberCount = calculatePredict(datas, "numbers", maxNumber, numberDraw, orderBy, firstFilterPredict, secondFilterPredict);
    const bonusCount = calculatePredict(datas, "bonus", maxBonus, bonusDraw, orderBy, firstFilterPredict, secondFilterPredict);

    console.log(numberCount);
    console.log(bonusCount);
    console.log(datas)

    return(
        <div className="page">
            <h1>Pronostics {capitalizedGame}</h1>
            <p className="paragraph">Ce tableau regroupe toutes les statistiques du jeu {capitalizedGame} relatives à chacun des {maxNumber} numéros (depuis la création du jeu), ainsi que des {maxBonus} numéros bonus {game === 'euromillions' ? '(depuis l’instauration des 12 étoiles le 27/09/2016)' : ''}</p>

            <div className="predict-div">
                <h2>Statistiques des numéros principaux</h2>
                <TablePredict settings={tableSettings} datas={numberCount} isFiltered={false} type={'numbers'}/>

                <h2>Statistiques des numéros bonus</h2>
                <TablePredict settings={tableSettings} datas={bonusCount} isFiltered={false} type={'bonus'}/>
            </div>
        </div>
    )
}